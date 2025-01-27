import { assert } from 'chai';
import { HHAccountRateMethods } from "../lib/hhAccountRateMethods.js";
import { deploySpCoinContract, getDeployedArtifactsABIAddress } from "../lib/deployContract.js";
// import { SpCoinAccessModules } from "../../../node_modules-dev/spcoin-back-end/spcoin-access-modules-cjs/index.js";
import { SpCoinAccessModules } from "@sponsorcoin/spcoin-access-modules-cjs"

let signer;
let spCoinAddress;
let spCoinABI;
let spCoinContractDeployed;
let hHAccountRateMethods;
let SPONSOR_ACCOUNT_SIGNERS;
let SPONSOR_ACCOUNT_KEYS;
let AGENT_ACCOUNT_KEYS; 
let RECIPIENT_ACCOUNT_KEYS; 
let AGENT_RATES; 
let RECIPIENT_RATES;
let BURN_ADDRESS;

describe("spCoinContract", function () {
  beforeEach(async () => {
    hHAccountRateMethods = new HHAccountRateMethods();
    await hHAccountRateMethods.initHHAccounts();
    SPONSOR_ACCOUNT_SIGNERS = hHAccountRateMethods.SPONSOR_ACCOUNT_SIGNERS;
    SPONSOR_ACCOUNT_KEYS = hHAccountRateMethods.SPONSOR_ACCOUNT_KEYS;
    RECIPIENT_ACCOUNT_KEYS = hHAccountRateMethods.RECIPIENT_ACCOUNT_KEYS;
    AGENT_ACCOUNT_KEYS = hHAccountRateMethods.AGENT_ACCOUNT_KEYS;
    AGENT_RATES = hHAccountRateMethods.AGENT_RATES;
    RECIPIENT_RATES = hHAccountRateMethods.RECIPIENT_RATES;
    BURN_ADDRESS = hHAccountRateMethods.BURN_ADDRESS;

    signer = SPONSOR_ACCOUNT_SIGNERS[0];
    spCoinContractDeployed = await deploySpCoinContract();

    const { address, abi } = await getDeployedArtifactsABIAddress("SPCoin");
    spCoinAddress = address;
    spCoinABI = abi;
  });

  it("1. <TYPE SCRIPT> VALIDATE HARDHAT IS ACTIVE WITH ACCOUNTS", async () => {
    hHAccountRateMethods.dump();
    console.log(`signer.address = ${signer.address}`);

    // Validate 20 HardHat Accounts created
    assert.equal(hHAccountRateMethods.SPONSOR_ACCOUNT_SIGNERS.length, 20);

    // Validate Active signer Account is Account 0
    console.log(`hHAccountRateMethods.SPONSOR_ACCOUNT_SIGNERS[0].address = ${hHAccountRateMethods.SPONSOR_ACCOUNT_SIGNERS[0].address}`);
    
    // Validate the Last Account
    assert.equal(hHAccountRateMethods.SPONSOR_ACCOUNT_KEYS[19], "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199");
  });

  it("2. <JAVA SCRIPT> VALIDATE ADD TRANSACTION RATES", async () => {
    const spCoinClassModules = new SpCoinAccessModules(spCoinABI, spCoinAddress, signer);
    const { spCoinAddMethods, spCoinRewardsMethods, spCoinReadMethods, spCoinLogger } = spCoinClassModules;

    // Test Successful Record Insertion of Sponsor and 
    // Recipient Account to the Blockchain Network.
    await spCoinAddMethods.addSponsorship(
      SPONSOR_ACCOUNT_SIGNERS[0],
      RECIPIENT_ACCOUNT_KEYS[1],
      RECIPIENT_RATES[9],
      "1.000000000000000008"
    );

  // await spCoinAddMethods.addSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[1],
  //   RECIPIENT_ACCOUNT_KEYS[5],
  //   RECIPIENT_RATES[9],
  //   "1.000000000000000008"
  // );

  // await spCoinAddMethods.addSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[9],
  //   "123.1"
  // );
  // await spCoinAddMethods.addSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[3],
  //   "456"
  // );

  // await spCoinAddMethods.addAgentSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[6],
  //   AGENT_ACCOUNT_KEYS[1],
  //   AGENT_RATES[2],
  //   "1.000000000000000008"
  // );
  
  // await spCoinAddMethods.addAgentSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[5],
  //   AGENT_ACCOUNT_KEYS[1],
  //   AGENT_RATES[9],
  //   "1.000000000000000008"
  // );


  // await spCoinAddMethods.addSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[5],
  //   "111"
  // );
 
  // await spCoinStakingMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1], 
  //   RECIPIENT_RATES[5],
  //   123
  // );
  
  // await spCoinStakingMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1], 
  //   RECIPIENT_RATES[5],
  //   456
  // );

  // await spCoinStakingMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[1],
  //   RECIPIENT_ACCOUNT_KEYS[2], 
  //   RECIPIENT_RATES[5],
  //   789
  // );

  // await spCoinAddMethods.addSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[2],
  //   RECIPIENT_RATES[5],
  //   "99.9"
  // );

  
  // await spCoinERC20Methods.transfer(
  //   RECIPIENT_ACCOUNT_KEYS[2],
  //   "90000000000000000000000"
  // )

  // await spCoinAddMethods.addSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[5],
  //   "1.000000000000000008"
  // );

  // await spCoinERC20Methods.transfer(
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   "90000000000000000000000"
  // )  
  
 // await spCoinAddMethods.addSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[1],
  //   RECIPIENT_ACCOUNT_KEYS[2],
  //   RECIPIENT_RATES[5],
  //   "2.000000000000000008"
  // );
 
  // await spCoinStakingMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1], 
  //   RECIPIENT_RATES[4],
  //   333
  // );

  // await spCoinStakingMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[0],
  //   RECIPIENT_ACCOUNT_KEYS[2], 
  //   RECIPIENT_RATES[4],
  //   444
  // );

  // await spCoinStakingMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[0],
  //   RECIPIENT_ACCOUNT_KEYS[2], 
  //   RECIPIENT_RATES[4],
  //   123
  // );

  // await spCoinStakingMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[1],
  //   RECIPIENT_ACCOUNT_KEYS[2], 
  //   RECIPIENT_RATES[5],
  //   555
  // );

  // await spCoinStakingMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[1],
  //   RECIPIENT_ACCOUNT_KEYS[2], 
  //   RECIPIENT_RATES[5],
  //   666
  // );

  // await spCoinStakingMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[1],
  //   RECIPIENT_ACCOUNT_KEYS[2], 
  //   RECIPIENT_RATES[7],
  //   777
  // );

  // await spCoinStakingMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[1],
  //   RECIPIENT_ACCOUNT_KEYS[2], 
  //   RECIPIENT_RATES[7],
  //   777
  // );

  // await spCoinStakingMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1], 
  //   RECIPIENT_RATES[4],
  //   444
  // );

    /* START THIS WORKS
  await spCoinAddMethods.addAgentSponsorship(
    SPONSOR_ACCOUNT_SIGNERS[0],
    RECIPIENT_ACCOUNT_KEYS[1],
    RECIPIENT_RATES[5],
    AGENT_ACCOUNT_KEYS[2],
    AGENT_RATES[9],
    "1.000000000000000008"
  );
  
   await spCoinStakingMethods.depositRecipientStakingRewards(
    SPONSOR_ACCOUNT_KEYS[0],
    RECIPIENT_ACCOUNT_KEYS[1], 
    RECIPIENT_RATES[4],
    333
  );

  await spCoinStakingMethods.depositAgentStakingRewards(
    RECIPIENT_ACCOUNT_KEYS[1],
    AGENT_ACCOUNT_KEYS[2],
    RECIPIENT_RATES[4],
    444
  );
  END THIS WORKS */
  



// FIX TRANSFER so UNITS are in SPCOIN, not WEI
  // await spCoinERC20Methods.transfer(
  //    RECIPIENT_ACCOUNT_KEYS[1],
  //    100000000000000000000
  //  )
    
  // await spCoinAddMethods.addSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[4],
  //   "3.000000000000000008"
  // );

  // await spCoinStakingMethods.depositSponsorStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[0],   // DEPOSIT ACCOUNT
  //   RECIPIENT_ACCOUNT_KEYS[1], // SOURCE ACCOUNT
  //   RECIPIENT_RATES[4],
  //   999
  // );

  // await spCoinStakingMethods.depositSponsorStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[0],   // DEPOSIT ACCOUNT
  //   RECIPIENT_ACCOUNT_KEYS[1], // SOURCE ACCOUNT
  //   RECIPIENT_RATES[4],
  //   777
  // );

  // await spCoinStakingMethods.depositSponsorStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[0],   // DEPOSIT ACCOUNT
  //   RECIPIENT_ACCOUNT_KEYS[1], // SOURCE ACCOUNT
  //   RECIPIENT_RATES[3],
  //   999
  // );


 

  // await spCoinStakingMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[0],    // SOURCE ACCOUNT
  //   RECIPIENT_ACCOUNT_KEYS[1],  // DEPOSIT ACCOUNT
  //   RECIPIENT_RATES[4],
  //   333
  // );

  // await spCoinAddMethods.addBackDatedSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],   // DEPOSIT ACCOUNT
  //   RECIPIENT_ACCOUNT_KEYS[1], 
  //   RECIPIENT_RATES[1],
  //   "100", 
  //   dateInSeconds() - year
  // );  
  
  // await spCoinAddMethods.addBackDatedSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],   // DEPOSIT ACCOUNT
  //   RECIPIENT_ACCOUNT_KEYS[1], 
  //   RECIPIENT_RATES[2],
  //   "100", 
  //   dateInSeconds() - year
  // );  

  // await spCoinAddMethods.addBackDatedSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],   // DEPOSIT ACCOUNT
  //   RECIPIENT_ACCOUNT_KEYS[1], 
  //   RECIPIENT_RATES[3],
  //   "100", 
  //   dateInSeconds() - year
  // );  

  // await spCoinAddMethods.addBackDatedSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],   // DEPOSIT ACCOUNT
  //   RECIPIENT_ACCOUNT_KEYS[1], 
  //   RECIPIENT_RATES[4],
  //   "100", 
  //   dateInSeconds() - year
  // );  

  // await spCoinAddMethods.addBackDatedSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],   // DEPOSIT ACCOUNT
  //   RECIPIENT_ACCOUNT_KEYS[1], 
  //   RECIPIENT_RATES[5],
  //   "100", 
  //   dateInSeconds() - year
  // );  

  // await spCoinAddMethods.addBackDatedSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],   // DEPOSIT ACCOUNT
  //   RECIPIENT_ACCOUNT_KEYS[1], 
  //   RECIPIENT_RATES[6],
  //   "100", 
  //   dateInSeconds() - year
  // );  

  // await spCoinAddMethods.addBackDatedSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],   // DEPOSIT ACCOUNT
  //   RECIPIENT_ACCOUNT_KEYS[1], 
  //   RECIPIENT_RATES[7],
  //   "100", 
  //   dateInSeconds() - year
  // );

  // await spCoinAddMethods.addBackDatedSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],   // DEPOSIT ACCOUNT
  //   RECIPIENT_ACCOUNT_KEYS[1], 
  //   RECIPIENT_RATES[8],
  //   "100", 
  //   dateInSeconds() - year
  // );

  // let currDateInSecs = dateInSeconds();
  
  // await spCoinAddMethods.addBackDatedSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],   // DEPOSIT ACCOUNT
  //   RECIPIENT_ACCOUNT_KEYS[1], 
  //   RECIPIENT_RATES[9],
  //   "100", 
  //   dateInSeconds() - year
  // );

    // await spCoinAddMethods.addBackDatedSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],   // DEPOSIT ACCOUNT
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[5],
  //   "1",
  //   currDateInSecs - year//dateInSeconds
  // );  
  
  // await spCoinAddMethods.addSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],   // DEPOSIT ACCOUNT
  //   RECIPIENT_ACCOUNT_KEYS[1], 
  //   RECIPIENT_RATES[5],
  //   "2"
  // );


  // await spCoinAddMethods.addBackDatedAgentSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[10],
  //   AGENT_ACCOUNT_KEYS[2],
  //   AGENT_RATES[10],
  //   "1", 
  //   currDateInSecs - year
  // );

  // await spCoinAddMethods.addBackDatedAgentSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[10],
  //   AGENT_ACCOUNT_KEYS[2],
  //   AGENT_RATES[5],
  //   "2", 
  //   dateInSeconds() - month*6
  // );

  // await spCoinAddMethods.addBackDatedAgentSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[10],
  //   AGENT_ACCOUNT_KEYS[2],
  //   AGENT_RATES[10],
  //   "2", 
  //   currDateInSecs
  // );

  // await spCoinAddMethods.addBackDatedAgentSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[10],
  //   AGENT_ACCOUNT_KEYS[2],
  //   AGENT_RATES[10],
  //   "3", 
  //   dateInSeconds()
  // );

  // await spCoinAddMethods.addAgentSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[10],
  //   AGENT_ACCOUNT_KEYS[2],
  //   AGENT_RATES[10],
  //   "2"
  // );

  await spCoinRewardsMethods.updateAccountStakingRewards( SPONSOR_ACCOUNT_KEYS[0] );

  console.log("********************************************************************************");
  console.log("\n\n*** AFTER CREATE ******************************************************************************************************\n\n");
  console.log("********************************************************************************");

  let getBody = true;
  let spCoinRecords = await spCoinReadMethods.getSPCoinHeaderRecord(getBody);

  spCoinLogger.logJSONTree(spCoinRecords);

  // let accountRecords = await spCoinReadMethods.getAccountRecords()
  // spCoinLogger.logJSONTree(accountRecords);

  // await spCoinERC20Methods.transfer(
  //    RECIPIENT_ACCOUNT_KEYS[12],
  //    "1000000000"
  //  )
  
  // await spCoinDeleteMethods.unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1]);

  // await spCoinDeleteMethods.unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[2]);
 
  console.log("********************************************************************************");
  console.log("*** AFTER DELETE ***************************************************************");
  console.log("********************************************************************************");
 
    // spCoinLogger.logJSONTree(await spCoinReadMethods.getAccountRecords());


    // AccountListSize = (await getAccountListSize()).toNumber();
    // expect(AccountListSize).to.equal(3);
    // await spCoinDeleteMethods.unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[0], RECIPIENT_ACCOUNT_KEYS[1]);
    // await spCoinContractDeployed.deleteAccountFromMaster(RECIPIENT_ACCOUNT_KEYS[1]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[0], RECIPIENT_ACCOUNT_KEYS[2]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[1], RECIPIENT_ACCOUNT_KEYS[2]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[1], RECIPIENT_ACCOUNT_KEYS[0]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[2], RECIPIENT_ACCOUNT_KEYS[0]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[2], RECIPIENT_ACCOUNT_KEYS[1]);
   
    // spCoinLogger.logJSONTree(await spCoinReadMethods.getAccountRecords());
    // agentRateList = await getAgentRateList(
    //   SPONSOR_ACCOUNT_SIGNERS[1],
    //   RECIPIENT_ACCOUNT_KEYS[1],
    // RECIPIENT_RATES[10],
    //   AGENT_ACCOUNT_KEYS[1]);
    //   spCoinLogger.logJSON(agentRateList);

    // VALIDATE ACCOUNT CREATION
    // VALIDATE SPONSOR ACCOUNT
    // let sponsorAccount = await getAccountRecord(SPONSOR_ACCOUNT_SIGNERS[1]);
    // spCoinLogger.logJSON(sponsorAccount);
  });
/**/
});