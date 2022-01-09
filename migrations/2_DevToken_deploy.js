const Migrations = artifacts.require("DevToken");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
