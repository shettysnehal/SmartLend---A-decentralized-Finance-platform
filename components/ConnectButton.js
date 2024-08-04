import React,{useState} from 'react';
import { Button, Segment } from 'semantic-ui-react';
import Web3 from 'web3';

export default function ConnectButton(props) {

  const connect = async(event) => {
    // Add your connect logic here
    event.preventDefault();
    let web3;
   console.log('Connect clicked!');
   if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
     console.log(1)
     window.ethereum.request({ method: "eth_requestAccounts" });
   
     web3 = new Web3(window.ethereum);
   } else {
     const provider = new Web3.providers.HttpProvider(
       "https://sepolia.infura.io/v3/060e2ee2dc34413387787c3f1d9a0a5c"
     );
     web3 = new Web3(provider);
   }
  
  await web3.eth.getAccounts(function (error, result) {
 

     console.log(result)
     if(error){
        console.log("something went wrong ")
     }

  })};

  return (
    
      <Segment 
        style={props.style}
        inverted
      >
        <Button 
          style={{ width: "120px", height: "50px", fontSize: "17px" }} 
          inverted 
          onClick={connect}
        >
          {props.name}
        </Button>
      </Segment>
    
  );
}
