import { assert } from 'chai';
import { HHAccountRateMethods } from "../lib/hhAccountRateMethods.js";
import { stringifyBigInt } from "@sponsorcoin/spcoin-lib/utils.js";
import { deployWETH9Contract, deploySpCoinContract, getDeployedArtifactsABIAddress, getWeth9Contract } from "../lib/deployContract.js";
import { WethMethods, HARDHAT } from "../../../node_modules-dev/spcoin-back-end/weth-access-module-es6/index.js";
// import { WethMethods, HARDHAT } from "@sponsorcoin/weth-access-module-es6"
let signer;
let weth9Address;
let weth9ABI;
let weth9ContractDeployed;
let hHAccountRateMethods;
let SPONSOR_ACCOUNT_SIGNERS;
let SPONSOR_ACCOUNT_KEYS;
let RECIPIENT_ACCOUNT_KEYS;
let RECIPIENT_RATES;
let BURN_ADDRESS;

describe("WETH9 Contract Deployed", function () {
  beforeEach(async () => {
    hHAccountRateMethods = new HHAccountRateMethods();
    await hHAccountRateMethods.initHHAccounts();
    SPONSOR_ACCOUNT_SIGNERS = hHAccountRateMethods.SPONSOR_ACCOUNT_SIGNERS;
    SPONSOR_ACCOUNT_KEYS = hHAccountRateMethods.SPONSOR_ACCOUNT_KEYS;
    RECIPIENT_ACCOUNT_KEYS = hHAccountRateMethods.RECIPIENT_ACCOUNT_KEYS;
    RECIPIENT_RATES = hHAccountRateMethods.RECIPIENT_RATES;
    BURN_ADDRESS = hHAccountRateMethods.BURN_ADDRESS;
    signer = SPONSOR_ACCOUNT_SIGNERS[0];
    
    const { contractDeployed, address, abi } = await getDeployedArtifactsABIAddress("WETH9");
    weth9ContractDeployed = contractDeployed;
    weth9Address = address;
    weth9ABI = abi;
  });

  it("1. <TYPE SCRIPT> VALIDATE HARDHAT IS ACTIVE WITH ACCOUNTS", async function () {
    console.log(`signer.address = ${signer.address}`);

    // Validate 20 HardHat Accounts created
    assert.equal(hHAccountRateMethods.SPONSOR_ACCOUNT_SIGNERS.length, 20);

    // Validate Active signer Account is Account 0
    console.log(`hHAccountRateMethods.SPONSOR_ACCOUNT_SIGNERS[0].address = ${hHAccountRateMethods.SPONSOR_ACCOUNT_SIGNERS[0].address}`);

    // Validate the Last Account
    assert.equal(hHAccountRateMethods.SPONSOR_ACCOUNT_KEYS[19], "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199");
  });

  it("2. <TYPE SCRIPT> VALIDATE DEPLOYED CONTRACT BY GETTING SIGNER and TEST ACCOUNT[5] BALANCE_OF", async function () {
    const initialBalance = 10000000000000000000000n;
    signer = SPONSOR_ACCOUNT_SIGNERS[0];
    console.debug(`stringifyBigInt(signer) = ${stringifyBigInt(signer)}`);
    console.debug(`stringifyBigInt(ethers.provider) = ${stringifyBigInt(ethers.provider)}`);
    const account5 = hHAccountRateMethods.SPONSOR_ACCOUNT_SIGNERS[5];
    const signerBalance = await ethers.provider.getBalance(signer.address);
    const account5Balance = await ethers.provider.getBalance(account5.address);

    // All Accounts have been given an ETH Balance of 10000000000000000000000 except the signer account.
    // The signer account (account[0]) balance is less because gas was used for initial setup of hard hat.
    console.log(`1. signer(${signer.address}) Balance = ${signerBalance}`);
    console.log(`2. account[5](${account5.address}) Balance = ${account5Balance}`);

    assert.isTrue(signerBalance < initialBalance, `ERROR: signerBalance(${signerBalance}) Not Less Than initialBalance(${initialBalance})`);
    assert.equal(account5Balance, initialBalance);
  });

  it("3. <TYPE SCRIPT> Wrap ETH Using Deployed WETH Contract with Signer account[0]", async function () {
    console.log(`Before Weth Address = ${weth9Address}`);
    const signedWeth = weth9ContractDeployed.connect(signer);
    console.log(`After Weth Address = ${weth9Address}`);
    const wrapEthAmount = ethers.parseEther("2");
    const wrapWeiAmount = "5";

    let beforeEthBalance = await ethers.provider.getBalance(signer.address);
    let signerWethBalance = await signedWeth.balanceOf(signer.address);

    console.log(`1. BEFORE WRAP: signer(${signer.address}) ETH Balance = ${beforeEthBalance}`);
    console.log(`2. BEFORE WRAP WETH9Contract signer(${signerWethBalance}) WETH Balance = ${signerWethBalance}`);

    let tx = await signedWeth.deposit({ value: wrapEthAmount });
    tx = await signedWeth.deposit({ value: wrapWeiAmount });

    signerWethBalance = await signedWeth.balanceOf(signer.address);
    const afterEthBalance = await ethers.provider.getBalance(signer.address);

    console.log(`3. AFTER WRAP WETH9Contract signer(${signerWethBalance}) WETH Balance = ${signerWethBalance}`);
    console.log(`4. AFTER WRAP: signer(${signer.address}) ETH Balance = ${afterEthBalance}`);
    console.log(`5. AFTER WRAP: Wrap Gas Fees = ${(beforeEthBalance - afterEthBalance) - signerWethBalance}`);
  });

  it("4. <TYPE SCRIPT> Wrap ETH Using Deployed WETH Address with Signer account[0]", async function () {
    const signedWeth = new ethers.Contract(weth9Address, weth9ABI, signer);
    const wrapEthAmount = ethers.parseEther("2");
    const wrapWeiAmount = "5";

    let beforeEthBalance = await ethers.provider.getBalance(signer.address);
    let signerWethBalance = await signedWeth.balanceOf(signer.address);

    console.log(`1. BEFORE WRAP: signer(${signer.address}) ETH Balance = ${beforeEthBalance}`);
    console.log(`2. BEFORE WRAP WETH9Contract signer(${signerWethBalance}) WETH Balance = ${signerWethBalance}`);

    let tx = await signedWeth.deposit({ value: wrapEthAmount });
    tx = await signedWeth.deposit({ value: wrapWeiAmount });

    signerWethBalance = await signedWeth.balanceOf(signer.address);
    const afterEthBalance = await ethers.provider.getBalance(signer.address);

    console.log(`3. AFTER WRAP WETH9Contract signer(${signerWethBalance}) WETH Balance = ${signerWethBalance}`);
    console.log(`4. AFTER WRAP: signer(${signer.address}) ETH Balance = ${afterEthBalance}`);
    console.log(`5. AFTER WRAP: Gas Fees = ${(beforeEthBalance - afterEthBalance) - signerWethBalance}`);
  });

  it("5. <TYPE SCRIPT> Unwrap ETH Using Deployed WETH Address with Signer account[0]", async function () {
    const ethDepositAmount = "2";
    const ethWithdrawAmount = "1";
    const wethMethods = new WethMethods();
    wethMethods.connect(weth9Address, weth9ABI, signer);

    await wethMethods.depositETH(ethDepositAmount);
    await wethMethods.withdrawETH(ethWithdrawAmount);
  });

  it("6. <TYPE SCRIPT> Wrap/Unwrap ETH Using Deployed WETH Address with Signer account[2]", async function () {
    const signer = SPONSOR_ACCOUNT_SIGNERS[2];
    const ethDepositAmount = "2";
    const ethWithdrawAmount = "1";
    const wethMethods = new WethMethods();
    wethMethods.connect(weth9Address, weth9ABI, signer);

    await wethMethods.depositETH(ethDepositAmount);
    await wethMethods.withdrawETH(ethWithdrawAmount);
  });

  it("7. <TYPE SCRIPT> Wrap/Unwrap WEI Using Deployed WETH Address with Signer account[5]", async function () {
    const signer = SPONSOR_ACCOUNT_SIGNERS[5];
    const weiDepositAmount = 2n;
    const weiWithdrawAmount = 1n;
    const wethMethods = new WethMethods();
    wethMethods.connect(weth9Address, weth9ABI, signer);

    await wethMethods.depositWEI(weiDepositAmount);
    await wethMethods.withdrawWEI(weiWithdrawAmount);
  });

  it("8. <TYPE SCRIPT> Wrap/Unwrap ETH Using Deployed WETH Address with Signer account[9]", async function () {
    const signer = SPONSOR_ACCOUNT_SIGNERS[9];
    const weiDepositAmount = ethers.parseUnits("2");
    const weiWithdrawAmount = ethers.parseUnits("1");
    const wethMethods = new WethMethods();

    console.log(`weiDepositAmount = ${weiDepositAmount}`);
    console.log(`weiWithdrawAmount = ${weiWithdrawAmount}`);

    wethMethods.connect(weth9Address, weth9ABI, signer);

    await wethMethods.depositWEI(weiDepositAmount);
    await wethMethods.withdrawWEI(weiWithdrawAmount);
  });

  it("9. <TYPE SCRIPT> Wrap/Unwrap WEI Using connectWeth9DefaultNetwork with HardHat Network and Signer account[11]", async function () {
    const signer = SPONSOR_ACCOUNT_SIGNERS[11];
    const weiDepositAmount = ethers.parseUnits("123");
    const weiWithdrawAmount = ethers.parseUnits("23");

    const wethMethods = new WethMethods();
    wethMethods.connect(weth9Address, weth9ABI, signer);

    await wethMethods.depositWEI(weiDepositAmount);
    await wethMethods.withdrawWEI(weiWithdrawAmount);
  });
});
