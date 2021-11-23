var MyHyperverseToken = artifacts.require("./MyHyperverseToken.sol");

contract('MyHyperverse', function (accounts){

    var initialSupply = 1000000;
    var tooMuchValue = 99999999999;
    var testSendValue = 100;
    var tokenInstance;

    it('initialize  contract with correct values', function(){
        return MyHyperverseToken.deployed().then(function (instance){
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(tokenName){
            assert.equal(tokenName, "My Hyperverse Token", 'has correct name');
            return tokenInstance.symbol();
        }).then(function(tokenSymbol){
            assert.equal(tokenSymbol, "MHV", 'has correct symbol');
            return tokenInstance.standard();
        }).then(function(tokenStandatd){
            assert.equal(tokenStandatd, "My Hyperverse Token v1.0", 'has correct standard');
        });
    });

    it('set total supply upon deployment ', function () {
        return MyHyperverseToken.deployed().then(function (instance){
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function (totalSupply){
            assert.equal(totalSupply.toNumber(), initialSupply, 'sets total supply to 1,000,000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance){
            assert.equal(adminBalance.toNumber(), initialSupply, 'allocates initial supply to admin')
        });
    });

    it('transfers token ownership', function() {
        return MyHyperverseToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[1], tooMuchValue);
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert')>=0, 'message must contain revert');
            return tokenInstance.transfer.call(accounts[1], testSendValue, {from: accounts[0]});
        }).then(function(success){
            assert.equal(success, true, 'returns true')
            return tokenInstance.transfer(accounts[1], testSendValue, {from: accounts[0]});
        }).then(function(receipt){
            assert.equal(receipt.logs[0].event, 'Transfer', 'has Transfer event');
            assert.equal(receipt.logs[0].args.from, accounts[0], 'Transfer event has sender account');
            assert.equal(receipt.logs[0].args.to, accounts[1], 'Transfer event has receiver account');
            assert.equal(receipt.logs[0].args.value, testSendValue, 'Transfer event has value');
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance){
            assert.equal(balance.toNumber(), testSendValue, 'adds value to the receiving account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance){
            assert.equal(balance.toNumber(), initialSupply - testSendValue, 'deducts value from the sending account');
        });
    });
})