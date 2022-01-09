var DevToken = artifacts.require("DevsBucks");

contract("DevToken", function (accounts) {
  it("All after deployemnt tests", function () {
    return DevToken.deployed()
      .then(function (instance) {
        tokenInstance = instance;
        return tokenInstance.name();
      })
      .then(function (name) {
        assert.equal(name, "DevsBucks", "has correct name");
        return tokenInstance.symbol();
      })
      .then(function (symbol) {
        assert.equal(symbol, "DBK", "has correct symbol");
        return tokenInstance.decimals();
      })
      .then(function (decimal) {
        assert.equal(decimal, 7, "has correct standard");
        return tokenInstance.totalSupply();
      })
      .then(function (totalSupply) {
        assert.equal(totalSupply, 1000000, "has correct total supply");
        return tokenInstance.balanceOf(accounts[0]);
      })
      .then(function (adminBalance) {
        assert.equal(adminBalance, 1000000, "has correct admin balance");
        return tokenInstance.balanceOf(accounts[1]);
      })
      .then(function (userBalance) {
        assert.equal(userBalance, 0, "has correct user balance");
      });
  });
});

contract("DevToken", function (accounts) {
  it("Tranfer event", function () {
    return DevToken.deployed()
      .then(function (instance) {
        tokenInstance = instance;
        return tokenInstance.transfer(accounts[1], 1000000, { from: accounts[0] });
      }).then(function(receipt){
        assert.equal(receipt.logs.length, 1, "triggers one event");
        assert.equal(receipt.logs[0].event, "Transfer", "should be the 'Transfer' event");
        assert.equal(receipt.logs[0].args._from, accounts[0], "logs the account the tokens are transferred from");
        assert.equal(receipt.logs[0].args._to, accounts[1], "logs the account the tokens are transferred to");
        assert.equal(receipt.logs[0].args._value, 1000000, "logs the transfer amount");
        return tokenInstance.balanceOf(accounts[1]);
      }).then(function (userBalance) {
        assert.equal(userBalance, 1000000, "adds the amount to the receiving account");
        return tokenInstance.balanceOf(accounts[0]);
      }).then(function (userBalance) {
        assert.equal(userBalance, 0, "deducts the amount from the sending account");
      });
  });
});