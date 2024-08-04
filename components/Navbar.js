import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import web3 from '../etherum/web3';
import Web3 from 'web3';
import ConnectButton from './ConnectButton';
export default function Navbar() {
  const [activeItem, setActiveItem] = useState('explore');
  const router = useRouter();

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    if (name === 'create') {
      router.push('/campaigns/new');
    } 
    if(name== 'join'){
      router.push('/campaigns')
    }
    else if (name === 'explore') {
      router.push('/');
    }
    
  };
  

  const handleConnectClick = async(event) => {
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
    });
    // Add your function logic here
    // For example, navigate to a new page or show a modal
  };
  

  return (
    <>
    <div style={{display:"flex", backgroundImage: 'url("/template.png")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'top' ,
        backgroundRepeat:'no-repeat',margin:"0px",color:"white",paddingLeft:"500px",gap:"300px"}}>
    <Menu 
      secondary 
   /*    style={{ 
        backgroundImage: 'url("/template.png")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'top' ,
        backgroundRepeat:'no-repeat',margin:"0px",color:"white",paddingTop:"10px"
      }} */
    >
      <Menu.Menu position='right' style={{ gap: '25px',fontSize:"15px" }}>
        <Menu.Item
          name='explore'
          active={activeItem === 'explore'}
          onClick={handleItemClick}
          style={{color:"white"}}
        />
        <Menu.Item
          name='join'
          active={activeItem === 'join'}
          onClick={handleItemClick}
          style={{color:"white"}}
        />
        <Menu.Item
          name='create'
          active={activeItem === 'create'}
          onClick={handleItemClick}
          style={{color:"white"}}
        />
        <Menu.Item
          name='learn'
          active={activeItem === 'learn'}
          onClick={handleItemClick}
          style={{color:"white"}}
        />
       
      </Menu.Menu>
      
    </Menu>
    <ConnectButton name="Connect" style={{
     backgroundColor:"black",marginLeft:"25px",marginTop:"0px"
    }}/>
    </div>
    </>
   
  );
}
