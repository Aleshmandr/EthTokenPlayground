var MyHyperverseToken = artifacts.require("./MyHyperverseToken.sol");

contract('MyHyperverse', function (accounts){

    var initialSupply = 1000000;
    var tooMuchValue = 99999999999;
    var testSendValue = 100;

    it("initialize  contract with correct values", async() => {
       const token = await MyHyperverseToken.deployed();
       const tokenName = await token.name();
       assert.equal(tokenName, "My Hyperverse Token", 'has correct name');
       const tokenSymbol = await token.symbol();
       assert.equal(tokenSymbol, "MHV", 'has correct symbol');
       const tokenStandard = await token.standard();
       assert.equal(tokenStandard, "My Hyperverse Token v1.0", 'has correct standard');
    });

    it("set total supply upon deployment", async () => {
        const token = await MyHyperverseToken.deployed();
        const totalSupply = await token.totalSupply();
        assert.equal(totalSupply.toNumber(), initialSupply, 'sets total supply to 1,000,000');
        const adminBalance = await token.balanceOf(accounts[0])
        assert.equal(adminBalance.toNumber(), initialSupply, 'allocates initial supply to admin')
    });

    it("transfers token ownership", async() => {
        const token = await MyHyperverseToken.deployed();
        try {
            await token.transfer.call(accounts[1], tooMuchValue);
        } catch (error) {
            assert(error.message.indexOf('revert')>=0, 'message must contain revert');
        }
        const success = await token.transfer.call(accounts[1], testSendValue, {from: accounts[0]});
        assert.equal(success, true, "returns true");
        const receipt = await token.transfer(accounts[1], testSendValue, {from: accounts[0]});
        assert.equal(receipt.logs[0].event, "Transfer", "has Transfer event");
        assert.equal(receipt.logs[0].args.from, accounts[0], "Transfer event has sender account");
        assert.equal(receipt.logs[0].args.to, accounts[1], "Transfer event has receiver account");
        assert.equal(receipt.logs[0].args.value, testSendValue, "Transfer event has value");
        const balance0 = await await token.balanceOf(accounts[0]);
        assert.equal(balance0.toNumber(), initialSupply - testSendValue, "deducts value from the sending account");
        const balance1 = await token.balanceOf(accounts[1]);
        assert.equal(balance1.toNumber(), testSendValue, "adds value to the receiving account");
    });
})