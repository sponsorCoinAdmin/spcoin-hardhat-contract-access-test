const {
  AccountStruct,
  SponsorStruct,
  AgentStruct,
  RateHeaderStruct,
  TransactionStruct,
} = require("./dataTypes");

const {} = require("./utils/serialize");

const { logFunctionHeader, logDetail } = require("./utils/logging");

let spCoinContractDeployed;

//////////////////////////// ROOT LEVEL FUNCTIONS ////////////////////////////

setDeleteContract = (_spCoinContractDeployed) => {
  spCoinContractDeployed = _spCoinContractDeployed;
};

getAccountSize = async () => {
  logFunctionHeader("getAccountSize = async()");
  let maxSize = await spCoinContractDeployed.getAccountSize();
  logDetail("JS => Found " + maxSize + " Account Records");
  return maxSize;
};

getAccountKeys = async () => {
  logFunctionHeader("getAccountKeys = async()");
  let maxSize = await spCoinContractDeployed.getAccountSize();

  var insertedArrayAccounts = [];
  for (idx = 0; idx < maxSize; idx++) {
    let account = await spCoinContractDeployed.getAccountKey(idx);
    logDetail("JS => Address at Index " + idx + "  = " + account);
    insertedArrayAccounts.push(account);
  }
  return insertedArrayAccounts;
};

////////////////////////// ACCOUNT OBJECT FUNCTIONS //////////////////////////

addAccountRecord = async (_accountKey) => {
  logFunctionHeader("addAccountRecord = async(" + _accountKey + ")");
  logDetail("JS => Inserting Account " + _accountKey + " To Blockchain Network");
  await spCoinContractDeployed.addAccountRecord(_accountKey);
};

addAccountRecords = async (_accountArrayKeys) => {
  logFunctionHeader("addAccountRecord = async(arrayAccounts)");
  let maxSize = _accountArrayKeys.length;
  logDetail("JS => Inserting " + maxSize + " Records to Blockchain Network");

  for (idx = 0; idx < maxSize; idx++) {
    let account = _accountArrayKeys[idx];
    logDetail("JS => Inserting " + idx + ", " + account);
    await spCoinContractDeployed.addAccountRecord(account);
  }
  logDetail("JS => Inserted " + maxSize + " Accounts to Blockchain Network");

  return maxSize;
};

getAccountSponsorSize = async (_accountKey) => {
  logFunctionHeader("getAccountSponsorSize = async(" + _accountKey + ")");

  let maxSize = await spCoinContractDeployed.getAccountSponsorSize(_accountKey);
  logDetail("JS => Found " + maxSize + " Sponsor Records For Account " + _accountKey
  );
  return maxSize;
};

getAccountAgentSize = async (_accountKey) => {
  logFunctionHeader("getAccountAgentSize = async(" + _accountKey + ")");

  let maxSize = await spCoinContractDeployed.getAccountAgentSize(_accountKey);
  logDetail("JS => Found " + maxSize + " Agent Records For Account " + _accountKey
  );
  return maxSize;
};

getAccountAgentSponsorKeys = async (_accountKey) => {
  logFunctionHeader("getAccountAgentSponsorKeys = async(" + _accountKey + ")");
  let maxSize = await spCoinContractDeployed.getAccountAgentSponsorSize(_accountKey);
  let accountAgentSponsorKeys = {};
  for (let idx = 0; idx < maxSize; idx++) {
    let parentSponsor = await spCoinContractDeployed.getAccountAgentSponsorByIdx(_accountKey, idx );
    accountAgentSponsorKeys[parentSponsor] = idx;
  }
  return accountAgentSponsorKeys;
}

getAccountPatreonKeys = async (_accountKey) => {
  logFunctionHeader("getAccountPatreonKeys = async(" + _accountKey + ")");
  let maxSize = await spCoinContractDeployed.getAccountPatreonSize(_accountKey);

  let accountPatreonKeys = {};

  for (let idx = 0; idx < maxSize; idx++) {
    let patreon = await spCoinContractDeployed.getAccountPatreonKeyByIndex(_accountKey, idx );
    accountPatreonKeys[patreon] = idx;
  }
  return accountPatreonKeys;
};

getAccountSponsorKeys = async (_accountKey) => {
  logFunctionHeader("getAccountSponsorKeys = async(" + _accountKey + ")");
  let maxSize = await spCoinContractDeployed.getAccountSponsorSize(_accountKey);

  let accountSponsorKeys = {};

  for (let idx = 0; idx < maxSize; idx++) {
    let sponsor = await spCoinContractDeployed.getAccountSponsorKeyByIndex(_accountKey, idx );
    accountSponsorKeys[sponsor] = idx;
  }
  return accountSponsorKeys;
};

getAccountAgentKeys = async (_accountKey) => {
  logFunctionHeader("getAccountAgentKeys = async(" + _accountKey + ")");
  let maxSize = await getAccountAgentSize(_accountKey);

  let accountAgentKeys = {};

  for (let idx = 0; idx < maxSize; idx++) {
    let patreon = await spCoinContractDeployed.getAccountAgentKeyByIndex(_accountKey, idx );
    accountAgentKeys[patreon] = idx;
  }
  return accountAgentKeys;
};

deleteAccountRecord = async (_accountKey) => {
  // ToDo: do Solidity Code and Testing
    logFunctionHeader("deleteAccountRecord = async(" + _accountKey + ")");
    logDetail("JS => Deleting Account " + _accountKey + " From Blockchain Network");
    await spCoinContractDeployed.deleteAccountRecord(_accountKey);
  };
  
/////////////////////// SPONSOR OBJECT FUNCTIONS ///////////////////////

addAccountSponsor = async (_accountKey, _sponsorKey) => {
  logFunctionHeader(
    "addAccountSponsor = async(" + _accountKey + ", " + _sponsorKey + ")"
  );

  logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
  logDetail("JS => Inserting " + _sponsorKey + " Sponsors To Blockchain Network"
  );

  logDetail("JS => Inserting Sponsor " + _sponsorKey );
  await spCoinContractDeployed.insertAccountSponsor(_accountKey, _sponsorKey);
};

addAccountSponsors = async (_accountKey, _accountSponsorObjects) => {
  logFunctionHeader(
    "addAccountSponsors = async(" + _accountKey + ", " + _accountSponsorObjects + ")"
  );

  logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
  logDetail("JS => Adding " + _accountSponsorObjects.length + " Sponsors To Blockchain Network"
  );

  let sponsorCount = 0;
  for (sponsorCount; sponsorCount < _accountSponsorObjects.length; sponsorCount++) {
    let _sponsorKey = _accountSponsorObjects[sponsorCount];
    await addAccountSponsor(_accountKey, _sponsorKey);
  }
  logDetail("JS => Inserted = " + sponsorCount + " Sponsor Records");
  return --sponsorCount;
};

getSponsorAgentKeys = async (_accountKey, _sponsorAccountKey) => {
  logFunctionHeader("getSponsorAgentKeys = async(" + _accountKey + ", " + _sponsorAccountKey + ")" );
  let maxSize = await spCoinContractDeployed.getSponsorAgentSize(_accountKey, _sponsorAccountKey);

  let accountAgentKeys = {};
  for (let idx = 0; idx < maxSize; idx++) {
    let agent = await spCoinContractDeployed.getSponsorAgentKeyAddress(_accountKey, _sponsorAccountKey, idx);
    logDetail("JS => Agent[" + idx + "]: " + agent);
    accountAgentKeys[agent] = idx;
  }
  return accountAgentKeys;
};

getSponsorAgentSize = async (_accountKey, _sponsorAccountKey) => {
  logFunctionHeader("getSponsorAgentSize = async(" + _accountKey + ", " + _sponsorAccountKey + ")" );

  let agentSize = await spCoinContractDeployed.getSponsorAgentSize(
    _accountKey, _sponsorAccountKey );
  logDetail("JS => "+ "Inserted = " + agentSize + " Agent Records");
  return agentSize;
};

deleteAccountSponsor = async (_accountKey, _sponsorKey) => {
  // ToDo: do Solidity Code and Testing
  logFunctionHeader(
    "deleteAccountSponsor = async(" + _accountKey + ", " + _sponsorKey + ")"
  );

  logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
  logDetail("JS => Deleting " + _sponsorKey + " Sponsor From Blockchain Network"
  );

  logDetail("JS => Deleting Sponsor " + _sponsorKey );
  await spCoinContractDeployed.deleteAccountSponsor(_accountKey, _sponsorKey);
};

/////////////////////// AGENT OBJECT FUNCTIONS ////////////////////////

addSponsorAgent = async (_accountKey, _sponsorAccountKey, _accountAgentKey) => {
  logFunctionHeader(
    "accountAgentKey = async(" + _accountKey + ", " + _sponsorAccountKey + ", " + _accountAgentKey + ")"
  );
  logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
  logDetail("JS => Adding Agent " + _accountAgentKey + " To Blockchain Network");

  logDetail("JS =>  " + _accountKey + ". " + "Inserting Agent[" + _accountKey + "]: " + _accountAgentKey );
  await spCoinContractDeployed.insertSponsorAgent( _accountKey, _sponsorAccountKey, _accountAgentKey );
  logDetail("JS => "+ "Added Agent " + _accountAgentKey + " Record to SponsorKey " + _sponsorAccountKey);
};

addSponsorAgents = async (_accountKey, _sponsorAccountKey, _accountAgentKeys) => {
  logFunctionHeader(
    "addSponsorAgents = async(" + _accountKey + ", " + _sponsorAccountKey + ", " + _accountAgentKeys + ")"
  );
  logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
  logDetail("JS => For Sponsor[" + _sponsorAccountKey + "]: " + _sponsorAccountKey + ")");
  logDetail("JS => Inserting " + _accountAgentKeys.length + " Agents To Blockchain Network"
  );
  logDetail("JS => _accountAgentKeys = " + _accountAgentKeys);

  let agentSize = _accountAgentKeys.length;
  logDetail("JS => agentSize.length = " + agentSize);
  let agentCount = 0;
  for (let agentCount = 0; agentCount < agentSize; agentCount++) {
    let agentAccountKey = _accountAgentKeys[agentCount];
    logDetail("JS =>  " + agentCount + ". " + "Inserting Agent[" + agentCount + "]: " + agentAccountKey );
    await addSponsorAgent( _accountKey, _sponsorAccountKey, agentAccountKey );
  }
  logDetail("JS => "+ "Inserted = " + agentSize + " Agent Records");
  return agentCount;
};

deleteSponsorAgent = async (_accountKey, _sponsorAccountKey, _accountAgentKey) => {
  // ToDo: do Solidity Code and Testing
  logFunctionHeader(
    "deleteSponsorAgent = async(" + _accountKey + ", " + _sponsorAccountKey + ", " + _accountAgentKey + ")"
  );
  logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
  logDetail("JS => Deleting Agent " + _accountAgentKey + " From Blockchain Network");

  logDetail("JS =>  " + _accountKey + ". " + "Inserting Agent[" + _accountKey + "]: " + _accountAgentKey );
  await spCoinContractDeployed.deleteSponsorAgent( _accountKey, _sponsorAccountKey, _agentAccountKey );
  logDetail("JS => "+ "Deleted = " + _accountAgentKey + " Agent Record from SponsorKey " + _sponsorAccountKey);
};

/////////////////////// EXPORT MODULE FUNCTIONS ///////////////////////

module.exports = {
  addAccountField,
  addAccountRecord,
  addAccountRecords,
  addAccountSponsors,
  addSponsorAgent,
  addSponsorAgents,
  deleteAccountSponsor,
  deleteAccountRecord,
  getAccountSize,
  getAccountRecord,
  getAccountKeys,
  getAccountSponsorSize,
  getSponsorAgentKeys,
  getAccountSponsorKeys,
  setDeleteContract,
};