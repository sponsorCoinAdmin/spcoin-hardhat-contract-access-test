// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import "../dataTypes/SpCoinDataTypes.sol";

import "hardhat/console.sol";

contract Security is SpCoinDataTypes {
    address private  rootAdmin;
 
    constructor()  {
        rootAdmin = msg.sender;
    }

    modifier onlyRootAdmin () {
        require (msg.sender == rootAdmin, "Root Admin Security Access Violation");
        _;
    }

    modifier onlyOwner (address _account) {
        require (msg.sender == _account, "Owner Security Access Violation");
        _;
    }

    modifier onlyOwnerOrRootAdmin (address _account) {
        require (msg.sender == rootAdmin || msg.sender == _account, "Owner or Root Admin Security Access Violation");
        _;
    }

    modifier nonRedundantBenificiary (address _accountKey, address _benificiaryKey) {
        require (_accountKey != _benificiaryKey , "_accountKey and _benificiaryKey must be Mutually Exclusive)");
        _;
    }

    modifier nonRedundantAgent (address _accountKey, address _benificiaryKey, address _agentKey) {
        require (_accountKey != _benificiaryKey && 
                 _benificiaryKey != _agentKey && 
                 _accountKey != _agentKey , "_accountKey, _benificiaryKey and _agentKey must be Mutually Exclusive)");
        _;
    }
}
