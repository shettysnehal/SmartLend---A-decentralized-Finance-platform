import React, { useState } from 'react';
import { Card, Button, CardGroup, Form } from 'semantic-ui-react';
import { useRouter } from 'next/router'; // Import useRouter for navigation
import campaign from '../../../etherum/campaign';
import web3 from '../../../etherum/web3'; // Import web3 instance

const CardExampleGroupProps = ({ summary, campaignAddress }) => {
  const [amount, setAmount] = useState('');
  const router = useRouter(); // Correct usage of useRouter hook

  const handleContribute = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const amountInWei = web3.utils.toWei(amount, 'ether');
      const campaignInstance = campaign(campaignAddress); // Use the campaign address from props
      await campaignInstance.methods.contribute().send({
        from: accounts[0], // Replace with the user's account
        value: amountInWei
      });
      alert('Contribution successful!');
    } catch (error) {
      console.error('Error in contribution:', error);
      alert('Contribution failed.');
    }
  };

  const handleViewRequests = () => {
    router.push(`/campaigns/${campaignAddress}/requests`); // Navigate to the requests page
  };
  const cardStyle = {
    backgroundColor: 'rgba(0, 0, 0.7, 0.6)', // More transparent color
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Box shadow
    margin: '10px',
  };
  
  

  const items = [
    {
      header: 'Manager',
      description: 'The address of the campaign manager.',
      meta: summary[4],  // Manager address
    },
    {
      header: 'Minimum Contribution',
      description: 'The minimum amount required to contribute to the campaign.',
      meta: summary[0] + ' wei',  // Minimum contribution
    },
    {
      header: 'Approvers',
      description: 'Number of approvers for the campaign.',
      meta: summary[3],
      extra: (
        <>
          <Form.Input
           style={{margin:"15px"}}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type='number'
            step='0.01'
            placeholder='Enter amount in ETH'
          />
          <Button
           style={{marginBottom:"10px",marginLeft:"10px"}} onClick={handleContribute} primary>
            Contribute
          </Button>
        </>
      ) // Approvers count
    },
    {
      header: 'Requests',
      description: 'Number of requests made in the campaign.',
      meta: summary[2],
      extra: (
        <Button  style={{marginBottom:"10px",marginLeft:"10px"}} onClick={handleViewRequests} primary>
          View Requests
        </Button>
      ) // Requests length
    },
    {
      header: `${summary[5] ? "Public" : "Private"}`,
      description: 'Campaign visibility status.',
      meta: 'N/A',  // Public/Private status is in the header
    },
    {
      header: 'Interest Rate',
      description: 'Interest rate for the campaign.',
      meta: summary[10],  // Interest rate
    },
    {
      header: 'Country',
      description: 'Country where the campaign is based.',
      meta: summary[7],  // Country
    },
    {
      header: 'Year',
      description: 'Year associated with the campaign.',
      meta: summary[8],  // Year
    },
    {
      header: 'Description',
      description: 'Description of the campaign.',
      meta: summary[9],  // Campaign description
    },
  ];

  return (
    <div style={{
      display: 'grid',
      paddingRight:"10px",
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      backgroundColor:"#122d40",
      height:"120vh"
    }}>
      {items.map((item, index) => (
        <Card
          key={index}
          style={{ ...cardStyle, width: '100%' }} // Ensure cards take full width of grid cell
        >
          <Card.Content >
            <Card.Header style = {{color:"white",margin:"20px"}}>{item.header}</Card.Header>
            <Card.Meta style = {{color:"white",margin:"20px"}}>{item.meta}</Card.Meta>
            <Card.Description style = {{color:"white",margin:"20px"}}>{item.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            {item.extra}
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}

function convertBigIntToString(obj) {
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
}

export async function getServerSideProps(context) {
  const { address } = context.params; // Campaign address from params
  console.log('Received address:', address); // Debugging log

  try {
    const campaignInstance = campaign(address);
    let summary = await campaignInstance.methods.getSummary().call();
    // Log campaigns data from server side for debugging
    console.log('Server-side summary:', summary);

    // Convert `bigint` values to strings
    summary = convertBigIntToString(summary);

    return {
      props: {
        summary,
        campaignAddress: address, // Pass the campaign address as a prop
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        summary: {}, // Return empty object or appropriate fallback data
        campaignAddress: address, // Pass address even if there is an error
      },
    };
  }
}

export default CardExampleGroupProps;
