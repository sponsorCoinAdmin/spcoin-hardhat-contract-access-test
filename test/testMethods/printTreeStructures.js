const { AccountStruct,
        SponsorStruct,
        AgentStruct,
        RateHeaderStruct,
        TransactionStruct } = require("../prod/lib/dataTypes");
const { logFunctionHeader } = require("../prod/lib/utils/logging");

printTestHHAccounts = () => {
    return JSON.stringify(testHHAccounts, null, 2);
}

///////////////////////////////// Structure Data //////////////////////////////

printStructureTree = (_structure) => {
    logFunctionHeader("printStructureTree (" + _structure + ")");
    let structure = getJSONStructureTree(_structure);
    console.log(structure);
}

printStructureAccountSponsors = async(_accountStruct) => {
    logFunctionHeader("printStructureAccountSponsors (" + _accountStruct + ")");
    let accountSponsors = getJSONStructureAccountSponsors(_accountKey);
    console.log(accountSponsors);
}

printStructureAccountKYC = async(_accountStruct) => {
    logFunctionHeader("printStructureAccountKYC (" + _accountStruct + ")");
    let accountKYC = getJSONStructureAccountKYC(_accountKey);
    console.log(accountKYC);
}

printStructureSponsorAgents = async(_sponsorStruct) => {
    logFunctionHeader("printStructureSponsorAgents (" + _sponsorStruct + ")");
    let sponsorAgents = getJSONStructureSponsorAgents(_accountKey, _sponsorAccountKey);
    console.log(sponsorAgents);
}

///////////////////////////////// Structure Data //////////////////////////////

getJSONStructureTree = (_structure) => {
    logFunctionHeader("getJSONStructureTree (" + _structure + ")");
    return JSON.stringify(_structure, null, 2);
}

getJSONStructureAccountSponsors = async(_accountStruct) => {
    logFunctionHeader("getJSONStructureAccountSponsors (" + _accountStruct + ")");
    return JSON.stringify(_accountSponsors, null, 2);
}

getJSONStructureAccountKYC = async(_accountStruct) => {
    logFunctionHeader("getJSONStructureAccountKYC (" + _accountStruct + ")");
    return JSON.stringify(_accountStruct.KYC, null, 2);
}

getJSONStructureSponsorAgents = async(_sponsorStruct) => {
    logFunctionHeader("getJSONStructureSponsorAgents (" + _sponsorStruct + ")");
    return JSON.stringify(_sponsorStruct, null, 2);
}

///////////////////////////////// NetWork Stuff //////////////////////////////

printNetworkAccountSponsors = async(_accountKey) => {
    logFunctionHeader("printNetworkAccountSponsors (" + _accountKey + ")");
    let accountSponsors = getJSONNetworkAccountSponsors(_accountKey);
    console.log(accountSponsors);
}

printNetworkAccountKYC = async(_accountKey) => {
    logFunctionHeader("printNetworkAccountKYC (" + _accountKey + ")");
    let accountKYC = getJSONNetworkAccountKYC(_accountKey);
    console.log(accountKYC);
}

printNetworkSponsorAgents = async(_accountKey, _sponsorAccountKey) => {
    logFunctionHeader("printNetworkSponsorAgents (" + _accountKey + ", " + _sponsorAccountKey + ")");
    let sponsorAgents = getJSONNetworkSponsorAgents(_accountKey, _sponsorAccountKey);
    console.log(sponsorAgents);
}

///////////////////////////////// NetWork Stuff //////////////////////////////

getJSONNetworkAccountSponsors = async(_accountKey) => {
    logFunctionHeader("getJSONNetworkAccountSponsors (" + _accountKey + ")");
    let accountSponsors = getNetworkAccountSponsors(_accountKey);
    return JSON.stringify(accountSponsors, null, 2);
}

getJSONNetworkAccountKYC = async(_accountKey) => {
    logFunctionHeader("getJSONNetworkAccountKYC (" + _accountKey + ")");
    let accountKYC = getNetworkAccountKYC(_accountKey);
    return JSON.stringify(accountKYC, null, 2);
}

getJSONNetworkSponsorAgents = async(_accountKey, _sponsorAccountKey) => {
    logFunctionHeader("getJSONNetworkSponsorAgents (" + _accountKey + ", " + _sponsorAccountKey + ")");
    let sponsorAgents = getNetworkSponsorAgents(_accountKey, _sponsorAccountKey);
    return JSON.stringify(sponsorAgents, null, 2);
}

////////////////////////// To Do Get From Network ////////////////////////////

getNetworkAccountSponsors = async(_accountKey) => {
    logFunctionHeader("getNetworkAccountSponsors (" + _accountKey + ")");
    let accountSponsors = await getNetworkAccountSponsors(_accountKey);
    return JSON.stringify(accountSponsors, null, 2);
}

getNetworkAccountKYC = async(_accountKey) => {
    logFunctionHeader("getNetworkAccountKYC (" + _accountKey + ")");
    let accountKYC = await getNetworkAccountKYC(_accountKey);
    return JSON.stringify(accountKYC, null, 2);
}

getNetworkSponsorAgents = async(_accountKey, _sponsorAccountKey) => {
    logFunctionHeader("getNetworkSponsorAgents (" + _accountKey + ", " + _sponsorAccountKey + ")");
    let sponsorAgents = await getNetworkSponsorAgents(_accountKey, _sponsorAccountKey);
    return JSON.stringify(sponsorAgents, null, 2);
}

module.exports = {
// Local Calls
    printTestHHAccounts,
    printStructureTree,
    printStructureAccountSponsors,
    printStructureAccountKYC,
    printStructureSponsorAgents,
    getJSONStructureAccountSponsors,
    getJSONStructureAccountKYC,
    getJSONStructureSponsorAgents,
    // NetWork Calls
    printNetworkAccountSponsors,
    printNetworkAccountKYC,
    printNetworkSponsorAgents,
    getJSONNetworkAccountSponsors,
    getJSONNetworkAccountKYC,
    getJSONNetworkSponsorAgents,
    getNetworkAccountSponsors,
    getNetworkAccountKYC,
    getNetworkSponsorAgents
}