require("dotenv").config();
require("@nomiclabs/hardhat-waffle");

const { HARDHAT_RINKEBY_URL, HARDHAT_ACCOUNT } = process.env;

module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "rinkeby",
  networks: {
    rinkeby: {
      url: HARDHAT_RINKEBY_URL,
      accounts: [`${HARDHAT_ACCOUNT}`],
    },
  },
};
