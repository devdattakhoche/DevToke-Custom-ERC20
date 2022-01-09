const DevToken = artifacts.require("DevsBucks");

module.exports = function (deployer) {
  deployer.deploy(DevToken,1000000,"DevsBucks",7,"DBK",);
};
