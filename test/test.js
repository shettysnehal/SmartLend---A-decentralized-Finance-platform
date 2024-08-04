import assert from 'assert';
import ganache from 'ganache'; // Use 'ganache-cli' for the local blockchain provider
import Web3 from 'web3'; // Web3 is a default export

const web3 = new Web3(ganache.provider());
import compiledFactory from '../etherum/build/campaignFactory.json'assert { type: 'json' }; // Use default import for JSON files
import compiledCampaign from '../etherum/build/campaign.json'assert { type: 'json' }; // Use default import for JSON files

let accounts;
let factory;
let campaign;
beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    console.log(accounts);
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
      .deploy({ data: compiledFactory.bytecode })
      .send({ from: accounts[0], gas: "1000000" });
  
    await factory.methods.createCampaign(web3.utils.toWei("1", "ether")).send({
      from: accounts[0],
      gas: "1000000",
    });
    const addresses = await factory.methods.getDeployedCampaigns().call();
    console.log(addresses)
    const campaignAddress = addresses[0];
    campaign = await new web3.eth.Contract(
      JSON.parse(compiledCampaign.interface),
      campaignAddress
    );
  });
  