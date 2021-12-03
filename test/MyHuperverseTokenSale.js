var MyHyperverseTokenSale = artifacts.require("./MyHyperverseTokenSale.sol");

contract('MyHyperverseSale', function (accounts){
    var tokenSaleInstance;
    var correctTokenPrice = 10000000000000000;//0.001 eth

    it("initializes the contract with correct values", async ()=>{
        tokenSaleInstance = await MyHyperverseTokenSale.deployed();
        const address = tokenSaleInstance.address;
        assert.notEqual(address, "0x0", "has contact address");
        const tokenAddress = await tokenSaleInstance.tokenContract();
        assert.notEqual(tokenAddress, "0x0", "has a token contact address");
        const tokenPrice = await tokenSaleInstance.tokenPrice();
        assert.equal(tokenPrice, correctTokenPrice, "token price is correct");
    });
});