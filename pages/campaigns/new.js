import React, { useState } from 'react';
import { FormField, Button, Form, Checkbox, TextArea } from 'semantic-ui-react';
import axios from "axios";
import web3 from "../../etherum/web3";
import Factory from "../../etherum/factory";
import { useRouter } from 'next/router';

const ContributionForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    description: '',
    country: '',
    year: '',
    minContribution: '',
    email: '',
    otp: '',
    interestRate: '',
    visibility: false,
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleChange = (e, { name, value }) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSendOtp = async () => {
    if (formData.email) {
      try {
        const accounts = await web3.eth.getAccounts();
        const response = await axios.post("/api/sendotp", { email: formData.email });
        const otp = response.data.otp;
        await Factory.methods.setOtp(formData.email, otp).send({ from: accounts[0] });
        console.log("OTP sent to email");
        setIsOtpSent(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Please enter your email");
    }
  };

  const handleEmailVerify = async () => {
    if (formData.otp) {
      try {
        const eth_otp = await Factory.methods.returnOtp(formData.email).call();
        if (eth_otp === formData.otp) {
          setIsEmailVerified(true);
          console.log("Email verified");
        } else {
          console.log("Invalid OTP");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please enter the OTP");
    }
  };

  const handleSubmit = async () => {
    if (
      formData.description &&
      formData.country &&
      formData.year &&
      formData.minContribution &&
      formData.email &&
      (isEmailVerified ? formData.otp : true)
    ) {
      try {
        const minContribution = web3.utils.toWei(formData.minContribution, 'ether');
        const interestRate = formData.interestRate;
        console.log('Parameters for createCampaign:', {
          minContribution,
          visibility: formData.visibility,
          email: formData.email,
          country: formData.country,
          year: parseInt(formData.year, 10),
          description: formData.description,
          interestRate
        });

        const accounts = await web3.eth.getAccounts();
        const receipt = await Factory.methods.createCampaign(
          minContribution,
          !formData.visibility,
          formData.country,
          parseInt(formData.year, 10),
          formData.description,
          formData.email,
          interestRate
        ).send({ from: accounts[0] });
        router.push("/campaigns");

        console.log('Transaction receipt:', receipt);
      } catch (err) {
        console.error('Error submitting form:', err);
      }
    } else {
      alert('Please fill in all fields before submitting.');
    }
  };

  const handleVisibilityToggle = () => {
    setFormData(prevData => ({
      ...prevData,
      visibility: !prevData.visibility,
    }));
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '160vh',
      padding: '20px',
      backgroundColor: 'rgba(14, 38, 58, 0.8)',
      borderRadius: '0px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
    }}>
      <Form onSubmit={handleSubmit} style={{
        width: '700px',
        padding: '20px',
        backgroundColor: 'rgba(14, 38, 58, 0.8)',
        borderRadius: '20px',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
      }}>
        <FormField style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.9)' }}>Description (more than 3 lines)</label>
          <TextArea
            placeholder='Description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            rows={5}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          />
        </FormField>
        <FormField style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.9)' }}>Country</label>
          <TextArea
          
            placeholder='Country'
            name='country'
            value={formData.country}
            onChange={handleChange}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          />
        </FormField>
        <FormField style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.9)' }}>Year</label>
          <TextArea
            placeholder='Year'
            name='year'
            value={formData.year}
            onChange={handleChange}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          />
        </FormField>
        <FormField style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.9)' }}>Minimum Contribution</label>
          <TextArea
            placeholder='Minimum Contribution'
            name='minContribution'
            value={formData.minContribution}
            onChange={handleChange}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          />
        </FormField>
        <FormField style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.9)' }}>Interest Rate</label>
          <TextArea
            placeholder='Interest Rate'
            name='interestRate'
            value={formData.interestRate}
            onChange={handleChange}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          />
        </FormField>
        <FormField style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.9)' }}>Email</label>
          <TextArea
            placeholder='Email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          />
          <Button style={{ marginTop: '10px' }} type='button' onClick={handleSendOtp}>
            Send OTP
          </Button>
        </FormField>
        {isOtpSent && (
          <FormField style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.9)' }}>OTP</label>
            <TextArea
              placeholder='OTP'
              name='otp'
              value={formData.otp}
              onChange={handleChange}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            />
            <Button style={{ marginTop: '10px' }} type='button' onClick={handleEmailVerify}>
              Verify OTP
            </Button>
          </FormField>
        )}
        <FormField >
          <Checkbox
            style={{color:"white"}}
            toggle
            label='Make Public'
            checked={formData.visibility}
            onChange={handleVisibilityToggle}
            
          />
        </FormField>
        <Button type='submit' color='blue'>
          Create Campaign
        </Button>
      </Form>
    </div>
  );
};

export default ContributionForm;
