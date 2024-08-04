import React from 'react';
import { Button, Table, TableBody, TableHeader, TableHeaderCell, TableRow, TableCell } from 'semantic-ui-react';
import Campaign from '../../../../etherum/campaign';
import web3 from '../../../../etherum/web3';
import { useRouter } from 'next/router';

const RequestsIndex = ({ address, requests, requestCount, approversCount }) => {
  const router = useRouter();

  const onApprove = async (index) => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(index).send({
      from: accounts[0],
    });
    // Optionally, re-fetch data or update state here
  };

  const onFinalize = async (index) => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(index).send({
      from: accounts[0],
    });
    // Optionally, re-fetch data or update state here
  };

  const renderRows = () => {
    return requests.map((request, index) => (
      <TableRow
        key={index}
        disabled={request.complete}
        positive={Number(request.approvalCount) > Number(approversCount) / 2}
      >
        <TableCell style={{ color: '#ffffff' }}>{index}</TableCell>
        <TableCell style={{ color: '#ffffff' }}>{request.description}</TableCell>
        <TableCell style={{ color: '#ffffff' }}>{web3.utils.fromWei(request.value, 'ether')}</TableCell>
        <TableCell style={{ color: '#ffffff' }}>{request.recipient}</TableCell>
        <TableCell style={{ color: '#ffffff' }}>
          {Number(request.approvalCount)}/{Number(approversCount)}
        </TableCell>
        <TableCell>
          {request.complete ? null : (
            <Button color="green" basic onClick={() => onApprove(index)}>
              Approve
            </Button>
          )}
        </TableCell>
        <TableCell>
          {request.complete ? null : (
            <Button color="teal" basic onClick={() => onFinalize(index)}>
              Finalize
            </Button>
          )}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      height: '100vh',
      backgroundColor: 'rgba(14, 38, 58, 0.8)',
      borderRadius: '20px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
      overflowY: 'auto',
    }}>
      <h3 style={{ color: '#ffffff', marginBottom: '20px' }}>Requests ({Number(requestCount)})</h3>
      <Table celled style={{ width: '100%', maxWidth: '1200px', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Recipient</TableHeaderCell>
            <TableHeaderCell>Approval Count</TableHeaderCell>
            <TableHeaderCell>Approve</TableHeaderCell>
            <TableHeaderCell>Finalize</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>{renderRows()}</TableBody>
      </Table>
      <Button
        primary
        style={{ marginTop: '20px', backgroundColor: '#0070f3', color: '#ffffff', borderRadius: '5px' }}
        onClick={() => router.push(`/campaigns/${address}/requests/new`)}
      >
        Add Request
      </Button>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { address } = context.params;
  const campaign = Campaign(address);

  let requestCount;
  let approversCount;

  try {
    requestCount = await campaign.methods.getRequestsCount().call();
    approversCount = await campaign.methods.approversCount().call();
  } catch (error) {
    console.error('Error fetching counts:', error);
    return { props: { address, requests: [], requestCount: '0', approversCount: '0' } };
  }

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((_, index) =>
        campaign.methods.requests(index).call().catch((error) => {
          console.error(`Error fetching request ${index}:`, error);
          return null; // Handle errors gracefully
        })
      )
  );

  // Convert `bigint` values to strings
  const convertBigIntToString = (obj) => {
    if (typeof obj === 'bigint') {
      return obj.toString();
    } else if (Array.isArray(obj)) {
      return obj.map(item => convertBigIntToString(item));
    } else if (obj !== null && typeof obj === 'object') {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, convertBigIntToString(value)])
      );
    }
    return obj;
  };

  // Filter out any null requests in case of errors
  const serializedRequests = requests
    .filter((request) => request !== null)
    .map((request) => ({
      description: request.description,
      value: request.value,
      recipient: request.recipient,
      approvalCount: request.approvalCount,
      complete: request.complete,
    }));

  // Convert `bigint` values in requests to strings
  const requestsWithBigIntConverted = convertBigIntToString(serializedRequests);

  return {
    props: {
      address,
      requests: requestsWithBigIntConverted,
      requestCount: requestCount.toString(),
      approversCount: approversCount.toString(),
    },
  };
}

export default RequestsIndex;
