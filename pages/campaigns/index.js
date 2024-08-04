import React from 'react';
import { useRouter } from 'next/router';
import {
  ItemMeta,
  ItemImage,
  ItemHeader,
  ItemGroup,
  ItemExtra,
  ItemDescription,
  ItemContent,
  Item,
} from 'semantic-ui-react';
import factory from '../../etherum/factory'; 

const Campaigns = ({ campaigns }) => {
  const router = useRouter();

  const handleAddressClick = (address) => {
    router.push(`/campaigns/${address}`);
  };

  const ItemList = ({ campaigns }) => (
    <ItemGroup>
      {campaigns.map((campaign, index) => (
        <Item
          key={index}
          onClick={() => handleAddressClick(campaign.campaignAddress)}
          style={{
            margin: '20px 0', // Adjust margin to space items vertically
            backgroundColor: 'rgba(0, 0, 0.7, 0.6)', // Semi-transparent background color
            boxShadow: '0px 4px 8px rgba(0.9, 0.8, 0, 0.9)', // Subtle shadow
            borderRadius: '8px', // Rounded corners
            overflow: 'hidden', // Hide overflow for rounded corners
            cursor: 'pointer', // Pointer cursor on hover
            transition: 'transform 0.2s ease-in-out',
            height:"200px" // Smooth transition effect
            
            
          }}
        >
          <ItemImage size='small' src='/images.jpeg'style={{height:"100%"}} />
          <ItemContent >
    <ItemHeader style={{ fontSize: '20px', marginTop: '20px', color: 'rgba(255, 255, 255, 0.8)' }} as='a'>
      {campaign.campaignAddress}
    </ItemHeader>
    <ItemMeta style={{ fontSize: '18px', marginTop: '20px', color: 'rgba(255, 255, 255, 0.8)' }}>
      {campaign.description}
    </ItemMeta>
    <ItemDescription style={{ fontSize: '15px', marginTop: '20px', color: 'rgba(255, 255, 255, 0.7)' }}>
      {campaign.country}
    </ItemDescription>
    <ItemExtra style={{ fontSize: '10px', marginTop: '20px', color: 'rgba(255, 255, 255, 0.7)' }}>
      {campaign.year}
    </ItemExtra>
  </ItemContent>
        </Item>
      ))}
    </ItemGroup>
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '40px 20px',
        backgroundColor: '#122d40', // Background color
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1200px', // Maximum width
          margin: '0 auto', // Center content horizontally
        }}
      >
        <ItemList campaigns={campaigns} />
      </div>
    </div>
  );
};

// Utility function to convert `bigint` values to strings
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

export async function getServerSideProps() {
  let campaigns = [];

  try {
    campaigns = await factory.methods.getDeployedCampaigns().call();
    // Log campaigns data from server side for debugging
    console.log('Server-side campaigns data:', campaigns);

    // Convert `bigint` values to strings
    campaigns = convertBigIntToString(campaigns);

    // Clean up data if necessary (e.g., removing duplicate or incorrect entries)
    // Example: Filter out unwanted entries or clean up nested structures

  } catch (error) {
    console.error('Error in getServerSideProps:', error);
  }

  return {
    props: {
      campaigns,
    },
  };
}

export default Campaigns;
