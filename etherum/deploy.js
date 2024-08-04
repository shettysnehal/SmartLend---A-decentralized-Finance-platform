import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import compiledFactory from "./build/campaignFactory.json" assert { type: "json" };

const provider = new HDWalletProvider(
  "sketch sunset delay movie group drama mesh usage spot sausage olive cost",
  "https://sepolia.infura.io/v3/060e2ee2dc34413387787c3f1d9a0a5c"
);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(compiledFactory.abi)
      .deploy({ data: '0x' + compiledFactory.evm.bytecode.object })
      .send({ gas: "3700000", from: accounts[0] });

    console.log("Contract deployed to", result);
  } catch (error) {
    console.error("Deployment failed:", error);
  } finally {
    provider.engine.stop();
  }
};

deploy();
