const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("USDC", (m) => {
  const token = m.contract("USDC", [12287687]);

//   m.call(weth, "launch", []);

  return { token };
});