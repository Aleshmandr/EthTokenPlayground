const MyHyperverseToken = artifacts.require("MyHyperverseToken");

module.exports = function (deployer) {
    var initialSupply = 1000000;
    deployer.deploy(MyHyperverseToken, initialSupply);
};
