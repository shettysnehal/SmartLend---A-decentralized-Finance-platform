/* 0x2E8F36361b18CE08f720E94322450Dbb115eCf5d */
import web3 from './web3';
import compiledFactory from './build/campaignFactory.json' assert { type: "json" };
const instance = new web3.eth.Contract(
    compiledFactory.abi,'0x2E8F36361b18CE08f720E94322450Dbb115eCf5d'
);
export default instance;