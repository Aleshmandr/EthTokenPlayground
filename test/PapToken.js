var PapToken = artifacts.require("./PapToken.sol");

contract('PapToken', function (accounts){
    it('set total supply upon deployment ', function () {
        return PapToken.deployed().then(function (instance){
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function (totalSupply){
            assert.equal(totalSupply.toNumber(), 1000000, 'sets total supply to 1,000,000'); 
        });
    });
})