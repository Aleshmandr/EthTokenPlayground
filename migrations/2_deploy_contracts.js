const PapToken = artifacts.require("PapToken");

module.exports = function (deployer) {
    deployer.deploy(PapToken);
};
