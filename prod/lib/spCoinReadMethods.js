const { } = require("./utils/logging");
const {
  AccountStruct,
  AgentRateStruct,
  AgentStruct,
  RecipientStruct,
  RecipientRateStruct,
  TransactionStruct } = require("./spCoinDataTypes");
const { hexToDecimal, bigIntToDecimal } = require("./utils/serialize");

let spCoinContractDeployed;
let signer;

//////////////////////////// ROOT LEVEL FUNCTIONS ////////////////////////////

injectReadMethodsContract = (_spCoinContractDeployed) => {
  spCoinContractDeployed = _spCoinContractDeployed;
};

injectReadMethodsSigner = (_signer) => {
  signer = _signer;
};

getAccountListSize = async () => {
  logFunctionHeader("getAccountListSize = async()");
  let maxSize = (await getAccountList()).length;
  logDetail("JS => Found " + maxSize + " Account Keys");
  logExitFunction();
  return maxSize;
};

getAccountList = async () => {
  logFunctionHeader("getAccountList = async()");
  let insertedAccountList = await spCoinContractDeployed.connect(signer).getAccountList();
  logExitFunction();
  return insertedAccountList;
};

////////////////////////// ACCOUNT RECORD FUNCTIONS //////////////////////////


getAccountRecords = async() => {
  // console.log("==>1 getAccountRecords()");
  logFunctionHeader("getAccountRecords()");
  let accountArr = [];
  let AccountList = await spCoinContractDeployed.connect(signer).getAccountList();

  for (let i in AccountList) {
      let accountStruct = await getAccountRecord(AccountList[i]);
      accountArr.push(accountStruct);
  }
  logExitFunction();
  return accountArr;
}

getAccountRecord = async (_accountKey) => {
  // console.log("==>2 getAccountRecord = async(", _accountKey,")");
  let accountStruct = await getSerializedAccountRecord(_accountKey);
  accountStruct.accountKey = _accountKey;
  recipientAccountList = await getAccountRecipientKeys(_accountKey);
  accountStruct.recipientRecordList = await getRecipientRecordsByKeys(_accountKey, recipientAccountList);
  logExitFunction();
  return accountStruct;
}

getRecipientKeySize = async (_accountKey) => {
  // console.log("==>20 getRecipientKeySize = async(" + _accountKey + ")");
  logFunctionHeader("getRecipientKeySize = async(" + _accountKey + ")");

  let maxSize = (await getAccountRecipientKeys(_accountKey)).length;
  logDetail("JS => Found " + maxSize + " Account Recipient Keys");
  logExitFunction();
  return maxSize;
};

getAccountRecipientKeys = async (_accountKey) => {
  // console.log("==>4 getAccountRecipientKeys = async(" + _accountKey + ")");
  logFunctionHeader("getAccountRecipientKeys = async(" + _accountKey + ")");
  let recipientAccountList = await spCoinContractDeployed.connect(signer).getRecipientKeys(_accountKey);
  logExitFunction();
  return recipientAccountList;
};

/////////////////////// RECIPIENT RECORD FUNCTIONS ///////////////////////

getAgentRecordKeys = async (_sponsorKey, _recipientKey, _recipientRateKey) => {
  // console.log("==>13 getAgentRecordKeys = async(" + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ")" );
  logFunctionHeader("getAgentRecordKeys = async(" + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ")" );
  agentAccountList = await spCoinContractDeployed.connect(signer).getAgentRecordKeys(_sponsorKey, _recipientKey, _recipientRateKey);
  logExitFunction();
  return agentAccountList;
};

/////////////////////// AGENT RECORD FUNCTIONS ////////////////////////

getSerializedAccountRecord = async (_accountKey) => {
  // console.log("==>3 getSerializedAccountRecord = async(" + _accountKey + ")");
  logFunctionHeader("getSerializedAccountRecord = async(" + _accountKey + ")");
  let serializedAccountRec =
    await spCoinContractDeployed.connect(signer).getSerializedAccountRecord(_accountKey);
    logExitFunction();
  return deSerializedAccountRec(serializedAccountRec);
};

//////////////////// LOAD ACCOUNT DATA //////////////////////
getRecipientsByAccount = async(_accountKey) => {    
  logFunctionHeader("getRecipientsByAccount = async("  + _accountKey + ")");
  recipientAccountList = await getAccountRecipientKeys(_accountKey);
  recipientRecordList = await getRecipientRecordsByKeys(_accountKey,recipientAccountList);
  logExitFunction();
  return recipientRecordList;
}
//////////////////// LOAD RECIPIENT DATA //////////////////////

getRecipientRecordsByKeys = async(_sponsorKey, _recipientAccountList) => {
  // console.log("==>5 getRecipientRecordsByKeys = async(" +_sponsorKey + ","+ _recipientAccountList + ")");
  logFunctionHeader("getRecipientRecordsByKeys = async(" +_sponsorKey + ","+ _recipientAccountList + ")");
  let recipientRecordList = [];
  for (let [idx, recipientKey] of Object.entries(_recipientAccountList)) {
    logDetail("JS => Loading Recipient Record " + recipientKey, idx);
    let recipientRecord = await getRecipientRecordByKeys(_sponsorKey, recipientKey);
    recipientRecordList.push(recipientRecord);
  }
  logExitFunction();
  return recipientRecordList;
}

getRecipientRecordByKeys = async(_sponsorKey, _recipientKey) => {
  // console.log("==>6 getRecipientRecordByKeys = async(" + _sponsorKey + ", ", + _recipientKey + ")");
  logFunctionHeader("getRecipientRecordByKeys = async(" +_sponsorKey, + ",", + _recipientKey + ")");
  let recipientRecord = new RecipientStruct(_recipientKey);
  recipientRecord.recipientKey = _recipientKey;

  let recordStr = await getSerializedRecipientRecordList(_sponsorKey, _recipientKey);
  recipientRecord.insertionTime = hexToDecimal(recordStr[0]);
  recipientRecord.stakedSPCoins = hexToDecimal(recordStr[1]);

  // ToDo New Robin
  recipientRecord.recipientRateRecordList = await getRecipientRatesByKeys(_sponsorKey, _recipientKey);
  logExitFunction();
  return recipientRecord;
}

getRecipientRatesByKeys = async(_sponsorKey, _recipientKey) => {
// console.log("==>8 getAgentRatesByKeys = async(" + _sponsorKey +","  + _recipientKey + ")");
logFunctionHeader("getAgentRatesByKeys = async(" + _sponsorKey +","  + _recipientKey + ")");
let networkRateList = await getRecipientRecordList(_sponsorKey, _recipientKey);
  let recipientRateRecordList = [];

  for (let [idx, recipientRateKey] of Object.entries(networkRateList)) {
    //log("JS => Loading Recipient Rates " + recipientRateKey + " idx = " + idx);
    let recipientRateRecord = await deSerializeRecipientRateRecordByKeys(_sponsorKey, _recipientKey, recipientRateKey);

    recipientRateRecordList.push(recipientRateRecord);
  }
  logExitFunction();
  return recipientRateRecordList;
}

getRecipientRecordList = async(_sponsorKey, _recipientKey) => {
  logFunctionHeader("getRecipientRecordList = async(" + _sponsorKey +","  + _recipientKey + ")");
// console.log("==>9 getRecipientRecordList = async(" + _sponsorKey +","  + _recipientKey + ")");

  let networkRateKeys = await spCoinContractDeployed.connect(signer).getRecipientRecordList(_sponsorKey, _recipientKey);
  let recipientRateRecordList = [];
  for (let [idx, netWorkRateKey] of Object.entries(networkRateKeys)) {
    recipientRateRecordList.push(netWorkRateKey.toNumber());
  }
  logExitFunction();
  return recipientRateRecordList;
}

//////////////////// LOAD RECIPIENT RATE DATA //////////////////////

getRecipientRateRecordByKeys = async(_sponsorKey, _recipientKey, _recipientRateKey) => {
  // console.log("==>12 getRecipientRateRecordByKeys = async("+_sponsorKey, + ", " + _recipientKey + ", " + _recipientRateKey + ")");
  logFunctionHeader("getRecipientRateRecordByKeys = async("+_sponsorKey, + ", " + _recipientKey + ", " + _recipientRateKey + ")");
  let recipientRateRecord = new RecipientRateStruct();
  recipientRateRecord.recipientRate = _recipientRateKey;
  let agentAccountList = await getAgentRecordKeys(_sponsorKey, _recipientKey, _recipientRateKey);
  recipientRateRecord.agentAccountList = agentAccountList;
  recipientRateRecord.agentRecordList = await getAgentRecordsByKeys(_sponsorKey, _recipientKey, _recipientRateKey, agentAccountList);

  logExitFunction();
  return recipientRateRecord;
}

//////////////////// LOAD RECIPIENT TRANSACTION DATA //////////////////////

getAgentRecordsByKeys = async(_sponsorKey, _recipientKey, _recipientRateKey, _agentAccountList) => {
  // console.log("==>14 getAgentRecordsByKeys = async("+_sponsorKey, + ", " + _recipientKey + ", " + _recipientRateKey + ")");
  logFunctionHeader("getAgentRecordsByKeys = async("+_sponsorKey, + ", " + _recipientKey + ", " + _recipientRateKey + ")");
  let agentRecordList = [];
  for (let [idx, agentKey] of Object.entries(_agentAccountList)) {
    let agentRecord = await getSerializedAgentRecord(_sponsorKey, _recipientKey, _recipientRateKey, agentKey);
      agentRecordList.push(agentRecord);
  }
  logExitFunction();
  return agentRecordList;
}

getSerializedAgentRecord = async(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey) => {
  // console.log("==>15 getSerializedAgentRecord = async(" + ", " + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ")");
  logFunctionHeader("getSerializedAgentRecord = async(" + ", " + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ")");
  agentRecord = new AgentStruct();
  agentRecord.agentKey = _agentKey;
  agentRecord.stakedSPCoins = bigIntToDecimal(await spCoinContractDeployed.connect(signer).getAgentTotalRecipient(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey));
  agentRecord.agentRateRecordList = await getAgentRatesByKeys(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey);
  logExitFunction();
  return agentRecord;
}

//////////////////// LOAD AGENT RATE DATA //////////////////////

getAgentRatesByKeys = async(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey) => {
  // console.log("==>16 getAgentRatesByKeys = async(" + _recipientKey+ ", " + _agentKey + ")");
  logFunctionHeader("getAgentRatesByKeys(" + ", " + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ")");
  
  let agentRateKeys = await getAgentRateKeys(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey);

  let agentRateRecordList = [];
  for (let [idx, agentRateKey] of Object.entries(agentRateKeys)) {
   let agentRateRecord = await deSerializeAgentRateRecordByKeys(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, agentRateKey);
    agentRateRecordList.push(agentRateRecord);
  }
  logExitFunction();
  return agentRateRecordList;
}

getAgentRateKeys = async (_sponsorKey, _recipientKey, _recipientRateKey, _agentKey) => {
  // console.log("==>17 getAgentRateKeys = async(" + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ")" );
  logFunctionHeader("getAgentRateKeys = async(" + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ")" );
  networkRateKeys = await spCoinContractDeployed.connect(signer).getAgentRateKeys(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey);
  let agentRateKeys = [];
  for (let [idx, netWorkRateKey] of Object.entries(networkRateKeys)) {
    agentRateKeys.push(netWorkRateKey.toNumber());
  }
  logExitFunction();
  return agentRateKeys;
};

//////////////////// LOAD AGENT TRANSACTION DATA //////////////////////

getRateTransactionsByKeys = async(_sponsorCoin, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey) => {
  // console.log("==>18 getRateTransactionsByKeys = async(" + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ", " + _agentRateKey + ")");
  logFunctionHeader("getRateTransactionsByKeys = async(" + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ", " + _agentRateKey + ")");
  let agentRateTransactionList = await spCoinContractDeployed.connect(signer).getRateTransactionList(_sponsorCoin, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
  logExitFunction();
  return getRateTransactionRecords(agentRateTransactionList);
}

getAgentRateRecordDataList = async(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey) => {
  // console.log("==>19 getAgentRateRecordDataList = async(", _recipientKey, _recipientRateKey, _agentKey, _agentRateKey, ")");
  logFunctionHeader("getAgentRateRecordDataList = async(" + _sponsorKey + ", " + _recipientKey + ", " + _agentKey + ", " + _agentRateKey + ")");
  let agentRateRecordStr = await spCoinContractDeployed.connect(signer).serializeAgentRateRecordStr(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
  let agentRateRecordList = agentRateRecordStr.split(",");
  logExitFunction();
  return agentRateRecordList;
}

getRateTransactionRecords = (transactionStr) => {
  logFunctionHeader("getAgentRateRecordDataList = async(" + transactionStr + ")");
  // console.log("==>19 getAgentRateRecordDataList = async(" + transactionStr + ")");
  let transactionRows = transactionStr.split("\n");
  let transactionRecs = [];
  for (let row in transactionRows) {
    let transactionFields = transactionRows[row].split(",");
    let transactionRec = new TransactionStruct();
    transactionRec.insertionTime = hexToDecimal(transactionFields[0]);
    transactionRec.quantity = hexToDecimal(transactionFields[1]);
    transactionRecs.push(transactionRec);
    // logJSON(transactionRec);
  }
  logExitFunction();
  return transactionRecs;
}

////////////////  RECORD DE-SERIALIZATION FUNCTIONS ///////////////////

deSerializeAgentRateRecordByKeys = async(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey) => {
  // console.log("==>18 getAgentRateByKeys(" + _recipientKey + ", " + _agentKey+ ", " + _agentRateKey + ")");
  logFunctionHeader("getAgentRateByKeys(" + _recipientKey + ", " + _agentKey+ ", " + _agentRateKey + ")");
  let agentRateRecord = new AgentRateStruct();
  let recordStr = await getAgentRateRecordDataList(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
  agentRateRecord.agentRate = _agentRateKey;
  agentRateRecord.insertionTime = hexToDecimal(recordStr[0]);
  agentRateRecord.lastUpdateTime = hexToDecimal(recordStr[1]);
  agentRateRecord.stakedSPCoins = hexToDecimal(recordStr[2]);
  
  agentRateRecord.transactions = await getRateTransactionsByKeys(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
  logExitFunction();
  return agentRateRecord;
}

getSerializedRecipientRecordList = async(_sponsorKey, _recipientKey) => {
  // console.log("==>7 getSerializedRecipientRecordList = async(" + _sponsorKey + ", " + _recipientKey+ ", " + ")");
  logFunctionHeader("getSerializedRecipientRecordList = async(" + _sponsorKey + ", " + _recipientKey+ ", " + ")");
  let recipientRecordStr = await spCoinContractDeployed.connect(signer).serializeRecipientRecordStr(_sponsorKey, _recipientKey);
  let recipientRecordList = recipientRecordStr.split(",");
  logExitFunction();
  return recipientRecordList;
}

getSerializedRecipientRateRecordList = async(_sponsorKey, _recipientKey, _recipientRateKey) => {
  // console.log("==>11 getSerializedRecipientRecordList = async(" + _sponsorKey + ", " + _recipientKey + ", "+ _recipientRateKey + ", " + ")");
  logFunctionHeader("getSerializedRecipientRateRecordList = async(" + _sponsorKey + _recipientKey + ", " + _recipientRateKey + ")");
  let recipientRateRecordStr = await spCoinContractDeployed.connect(signer).serializeRecipientRateRecordStr(_sponsorKey, _recipientKey, _recipientRateKey);
  let recipientRateRecordList = recipientRateRecordStr.split(",");
  logExitFunction();
  return recipientRateRecordList;
}

deSerializeRecipientRateRecordByKeys = async(_sponsorKey, _recipientKey, _recipientRateKey) => {
// console.log("==>10 deSerializeRecipientRateRecordByKeys(" + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ")");
logFunctionHeader("deSerializeRecipientRateRecordByKeys(" + _sponsorKey  + _recipientKey + ", " + _recipientRateKey + ")");
let recipientRateRecord = new RecipientRateStruct();
  let recordStr = await getSerializedRecipientRateRecordList(_sponsorKey, _recipientKey, _recipientRateKey);
  recipientRateRecord.recipientRate = _recipientRateKey;
  recipientRateRecord.insertionTime = hexToDecimal(recordStr[0]);
  recipientRateRecord.lastUpdateTime = hexToDecimal(recordStr[1]);
  recipientRateRecord.stakedSPCoins = hexToDecimal(recordStr[2]);
  recipientRateRecord.recipientRecordList = await getRecipientRateRecordByKeys(_sponsorKey, _recipientKey, _recipientRateKey);
  logExitFunction();
  return recipientRateRecord;
}


/////////////////////// EXPORT MODULE FUNCTIONS ///////////////////////

module.exports = {
  deSerializeAgentRateRecordByKeys,
  getAccountList,
  getAccountListSize,
  getAccountRecord,
  getAccountRecords,
  getAccountRecipientKeys,
  getRecipientKeySize,
  getAgentRatesByKeys,
  getAgentRecordKeys,
  getAgentRecordsByKeys,
  getSerializedAccountRecord,
  getSerializedAgentRecord,
  getRecipientRateRecordByKeys,
  getRecipientRecordByKeys,
  getRecipientRecordsByKeys,
  getRecipientsByAccount,
  injectReadMethodsContract,
};
