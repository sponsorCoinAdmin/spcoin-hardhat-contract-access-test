const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SPCOIN", (m) => {
  const token = m.contract("SPCoin", []);

//   m.call(weth, "launch", []);

  return { token };
});