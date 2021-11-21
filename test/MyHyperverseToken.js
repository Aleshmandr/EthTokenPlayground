var MyHyperverseToken = artifacts.require("./MyHyperverseToken.sol");

contract('MyHyperverse', function (accounts){

    var initialSupply = 1000000;
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
})