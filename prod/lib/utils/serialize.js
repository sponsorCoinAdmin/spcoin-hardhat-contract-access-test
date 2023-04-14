const {
  AccountStruct,
  BenificiaryStruct,
  AgentStruct,
  AgentRateStruct,
  TransactionStruct,
} = require("../spCoinDataTypes");

deSerializedAccountRec = async (serializedAccountRec) => {
  // LOG_DETAIL = true;
  logFunctionHeader(
    "deSerializedAccountRec = async(" + serializedAccountRec + ")"
  );
  logDetail("JS => serializedAccountRec:\n" + serializedAccountRec);
  let accountStruct = new AccountStruct();
  let elements = serializedAccountRec.split("\\,");
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i].trim();
    let keyValue = element.split(":");
    logDetail("JS => keyValue = " + keyValue);

    let key = keyValue[0].trim();
    let value = keyValue[1].trim();
    // logDetail("JS => key     = " + key);
    // logDetail("JS => value   = " + value);
    addAccountField(key, value, accountStruct);
  }

  logDetail("JS => scPrintStructureTest.js, accountStruct:");
  logDetail("JS => accountStruct               = " + JSON.stringify(accountStruct, 0, 2)
  );
  logDetail("JS => ============================================================================"
  );
  return accountStruct;
};
const hexToDecimal = hex => parseInt(hex, 16);
const bigIntToDecimal = bigInt => parseInt(bigInt, 10);

addAccountField = (key, value, accountStruct) => {
  logFunctionHeader("addAccountField = (" + key + "," + value + ")");
  // log("addAccountField = (" + key + "," + value + ")");
  switch (key.trim()) {
    case "accountKey":
      accountStruct.accountKey = value;
      break;
    case "balanceOf":
      accountStruct.balanceOf = hexToDecimal(value);
    break;
    case "stakedSPCoins":
      accountStruct.stakedSPCoins = hexToDecimal(value);
    break;
    case "decimals":
      accountStruct.decimals = hexToDecimal(value);
    break;
    case "insertionTime":
      accountStruct.insertionTime = hexToDecimal(value);
      break;
    case "inserted":
      accountStruct.inserted = value;
      break;
    case "verified":
      accountStruct.verified = value;
      break;
    case "KYC":
      accountStruct.KYC = value;
      break;
      case "patronAccountList":
        accountStruct.patronAccountList = parseAddressStrRecord(value);
        break;
      case "benificiaryAccountList":
        accountStruct.benificiaryAccountList = parseAddressStrRecord(value);
      break;
      case "agentAccountList":
          accountStruct.agentAccountList = parseAddressStrRecord(value);
        break;
      case "parentBenificiaryAccountList":
        accountStruct.parentBenificiaryAccountList = parseAddressStrRecord(value);
      break;
      case "benificiaryRecordList":
        accountStruct.benificiaryRecordList = value;
      break;
    default:
      break;
  }
};

parseAddressStrRecord = (strRecord) => {
  if (strRecord == "")
    return [];
  else {
    logFunctionHeader("parseAddressStrRecord = " + strRecord);
    addressStrRecord = strRecord.split(",");
    return addressStrRecord;
  }
};

module.exports = {
  addAccountField,
  deSerializedAccountRec,
  hexToDecimal,
  bigIntToDecimal
};
