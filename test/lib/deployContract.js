const fs = require('fs')

const ethers = hre.ethers;

let spCoinContractDeployed;

const deployContract = async (symbol) => {
  const overrides = {
    to: "0x5147c5C1Cb5b5D3f56186C37a4bcFBb3Cd0bD5A7"
  };
  
  const Factory = await ethers.getContractFactory(symbol);
  const contractDeployed = await Factory.deploy();
  await contractDeployed.waitForDeployment();
  const address = await contractDeployed.getAddress();

  // myNewContract = await getDeployedContract(symbol)
  return contractDeployed;
}

const deploySpCoinContract = async () => {
  spCoinContractDeployed = await deployContract("SPCoin");
  return spCoinContractDeployed;
}

const deployWETH9Contract = async () => {
  let weth9ContractDeployed = await deployContract("WETH9");
  return weth9ContractDeployed;
}

// load ABI from build artifacts
async function getDeployedArtifactsABIAddress(symbol){
  console.log(`EXECUTING: getDeployedArtifactsABIAddress(${symbol})`)
  let contractDeployed = await deployContract(symbol);
  const address = await contractDeployed.getAddress();
  // console.log(`contractDeployed.address = ${address}`)
  // console.log(`contractDeployed = ${JSON.stringify(contractDeployed, null, 2)}`)
  const fsPromises = fs.promises;
  const HARDHAT_ARTIFACTS_HOME = "artifacts/contracts/";
  const ABI_FILE_PATH=`${HARDHAT_ARTIFACTS_HOME}${symbol}.sol/${symbol}.json`
  console.log(`ABI_FILE_PATH = ${ABI_FILE_PATH}`);
  const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
  // console.log(`ABI_FILE_PATH data = ${data}`);
  const abi = JSON.parse(data)['abi'];
  return { contractDeployed, address, abi };
}

async function getWeth9Contract(signer) {
  const signedWeth = getNewDeployedContract(signer, "WETH9");
  return signedWeth;
}

async function getSpCoinContract(signer) {
  const signedWeth = getNewDeployedContract(signer, "SPCoin");
  return signedWeth;
}

async function getNewDeployedContract(signer, symbol) {
  await deployContract(symbol);
  const signedWeth = getDeployedContract(signer, symbol);
  return signedWeth;
}

async function getDeployedContract(signer, symbol) {
  const { address, abi } = await getDeployedArtifactsABIAddress(symbol);
  const signedWeth = new ethers.Contract(address, abi, signer);
  return signedWeth;
}

module.exports = {
    deploySpCoinContract,
    deployWETH9Contract,
    getDeployedArtifactsABIAddress,
    getDeployedContract,
    getNewDeployedContract,
    getSpCoinContract,
    getWeth9Contract
  }