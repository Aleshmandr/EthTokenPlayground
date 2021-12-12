App = {
    web3Provider: null,
    contracts: {},
    account: "0x0",
    web3,

    init: function(){
        console.log("App initialized");
        return App.initWeb3();
    },
    initWeb3: function() {
        App.web3 = new Web3('ws://localhost:7545');
        App.web3Provider = web3.currentProvider;
        return App.initContracts();
    },
    initContracts: function(){
        $.getJSON("MyHyperverseTokenSale.json", function(mhvTokenSale){
            App.contracts.MHVTokenSale = TruffleContract(mhvTokenSale);
            App.contracts.MHVTokenSale.setProvider(App.web3Provider);
            App.contracts.MHVTokenSale.deployed().then(function(tokenSale){
                console.log(tokenSale.address);
            })
        }).done(function(){
            $.getJSON("MyHyperverseToken.json", function(mhvToken){
                App.contracts.MHVToken = TruffleContract(mhvToken);
                App.contracts.MHVToken.setProvider(App.web3Provider);
                App.contracts.MHVToken.deployed().then(function(token){
                    console.log(token.address);
                });
            });
            return App.render();
        });
    },
    render: function(){
        App.web3.eth.getCoinbase().then(function(account){
            App.account = account;
            $("#accountAddress").html("Your Account: "+account);
        });
    }
};

$(function(){
    $(window).load(function(){
        App.init();
    })
});
