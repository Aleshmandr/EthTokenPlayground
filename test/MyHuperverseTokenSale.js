var MyHyperverseTokenSale = artifacts.require("./MyHyperverseTokenSale.sol");
var MyHyperverseToken = artifacts.require("./MyHyperverseToken.sol");

contract('MyHyperverseSale', function (accounts){
    var tokenSaleInstance;
    var tokenInstance;
    const correctTokenPrice = 10000000000000000;//0.001 eth
    const tokenBuyer = accounts[2];
    const admin = accounts[0];
    const numberOfTokensToBuy = 1000;
    const tokensToSale = 300000;// 30% of total supply

    it("initializes the contract with correct values", async () => {
        tokenSaleInstance = await MyHyperverseTokenSale.deployed();
        const address = tokenSaleInstance.address;
        assert.notEqual(address, "0x0", "has contact address");
        const tokenAddress = await tokenSaleInstance.tokenContract();
        assert.notEqual(tokenAddress, "0x0", "has a token contact address");
        const tokenPrice = await tokenSaleInstance.tokenPrice();
        assert.equal(tokenPrice, correctTokenPrice, "token price is correct");
    });

    it("facilitates token buying", async () => {
        tokenInstance = await MyHyperverseToken.deployed();
        tokenSaleInstance = await MyHyperverseTokenSale.deployed();
        const address = tokenSaleInstance.address;
        await tokenInstance.transfer(tokenSaleInstance.address, tokensToSale, {from: admin});

        var value = numberOfTokensToBuy * correctTokenPrice;
        var receipt = await tokenSaleInstance.buyTokens(numberOfTokensToBuy, {from: tokenBuyer, value: value});
        assert.equal(receipt.logs.length, 1, "has one event");
        assert.equal(receipt.logs[0].event, "Sell", "has Sell event");
        assert.equal(receipt.logs[0].args.buyer, tokenBuyer, "Sell event has buyer account");
        assert.equal(receipt.logs[0].args.amount, numberOfTokensToBuy, "Sell event has tokens amount data ");

        var balanceOfBuyer = await tokenInstance.balanceOf(tokenBuyer);
        assert.equal(balanceOfBuyer.toNumber(), numberOfTokensToBuy, "increases balance of buyer");
        assert.equal((await tokenInstance.balanceOf(address)).toNumber(), tokensToSale - numberOfTokensToBuy, "decreases balance of sale");

        const tokensSold = await tokenSaleInstance.tokensSold();
        assert.equal(tokensSold.toNumber(), numberOfTokensToBuy, "increments number of tokens sold")
        try{
            await tokenSaleInstance.buyTokens(numberOfTokensToBuy, {from: tokenBuyer, value: 1});
            assert.fail();
        }catch (error) {
            assert(error.message.indexOf('revert')>=0, "Sell message must contain revert");
        }
        
        try{
            await tokenSaleInstance.buyTokens(300001, {from: tokenBuyer, value: value});
            assert.fail();
        }catch (error) {
            assert(error.message.indexOf('revert')>=0, "rejects buying more tokens than available");
        }

    });

    it("ends token sale", async () => {
        tokenInstance = await MyHyperverseToken.deployed();
        tokenSaleInstance = await MyHyperverseTokenSale.deployed();

        try{
            await tokenSaleInstance.endSale({from: tokenBuyer});
            assert.fail();
        }catch (error) {
            assert(error.message.indexOf('revert')>=0, "only admin can end the sale");
        }

        var adminBalanceBeforeSaleEnd = (await tokenInstance.balanceOf(admin)).toNumber();
        var saleRemainingBalance = (await tokenInstance.balanceOf(tokenSaleInstance.address)).toNumber();
        await tokenSaleInstance.endSale({from: admin});
        var adminBalanceAfterSaleEnd = (await tokenInstance.balanceOf(admin)).toNumber();
        assert.equal(adminBalanceBeforeSaleEnd + saleRemainingBalance, adminBalanceAfterSaleEnd, "sale remaining balance returned to admin");
        //var tokenPrice = (await tokenSaleInstance.tokenPrice()).toNumber();
        //assert.equal(0, tokenPrice, "contract destroyed (token price reseted)")
    });
});