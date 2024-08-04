import React, { useState } from "react";
import { Button, Form, FormField, Input, Message } from "semantic-ui-react";

import Campaign from "../../../../etherum/campaign";
import web3 from "../../../../etherum/web3";
import { useRouter } from 'next/router';

const New = ({ address }) => {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(false);

    const campaign = Campaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, value, recipientAddress)
        .send({ from: accounts[0] });

      // Redirect or update UI after successful submission
      router.push(`/campaigns/${address}`);
    } catch (err) {
      console.log(err);
      setError(true);
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={error}>
        <FormField>
          <label>Description</label>
          <Input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </FormField>
        <FormField>
          <label>Value (wei)</label>
          <Input
            type="number"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </FormField>
        <FormField>
          <label>Recipient Address</label>
          <Input
            value={recipientAddress}
            onChange={(event) => setRecipientAddress(event.target.value)}
          />
        </FormField>
        <Button primary loading={loading}>
          Create!
        </Button>
        <Message error header="Oops!" content={errorMessage} />
      </Form>
    </>
  );
};

export async function getServerSideProps(context) {
  const { address } = context.params;
  return {
    props: { address }, // will be passed to the page component as props
  };
}

export default New;
