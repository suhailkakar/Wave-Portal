require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: "alchemyapi-link",
      accounts: ["PRIVATE0-KEY"],
    },
  },
};
