const MyHyperverseToken = artifacts.require("./MyHyperverseToken.sol");
const MyHyperverseTokenSale = artifacts.require("./MyHyperverseTokenSale.sol");

module.exports = async (deployer) => {
    var initialSupply = 1000000;
    var tokenPriceWei = "10000000000000000";
    await deployer.deploy(MyHyperverseToken, initialSupply);
    await deployer.deploy(MyHyperverseTokenSale, MyHyperverseToken.address, tokenPriceWei);
};
