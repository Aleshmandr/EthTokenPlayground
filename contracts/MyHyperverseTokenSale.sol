// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "./MyHyperverseToken.sol";

contract MyHyperverseTokenSale {
    MyHyperverseToken public tokenContract;
    uint256 public tokenPrice;

    address admin;

    constructor (MyHyperverseToken _tokenContract, uint256 _tokenPrice) {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }
}