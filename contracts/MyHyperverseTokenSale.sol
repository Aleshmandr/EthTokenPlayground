// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "./MyHyperverseToken.sol";

contract MyHyperverseTokenSale {
    MyHyperverseToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    address admin;

    constructor (MyHyperverseToken _tokenContract, uint256 _tokenPrice) {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    function buyTokens(uint256 numberOfTokens) public payable{
        require(msg.value == multiply(numberOfTokens, tokenPrice));
        require(tokenContract.balanceOf(address(this)) >= numberOfTokens);
        require(tokenContract.transfer(msg.sender, numberOfTokens));
        tokensSold += numberOfTokens;
        emit Sell(msg.sender, numberOfTokens);
    }

    function multiply(uint256 x, uint256 y) internal pure returns (uint256 z){
        require(y == 0 || (z = x * y ) / y == x, "multiply overflow");
    }

    function endSale() public {
        require(msg.sender == admin);
        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));
        address payable addr = payable(address(admin));
        selfdestruct(addr);
    }

    event Sell(
        address indexed buyer,
        uint256 amount
    );
}