pragma solidity ^0.8.10;

contract MyHyperverseToken {
    
    uint256 public totalSupply;

    constructor(uint256 _totalSupply) {
        totalSupply = _totalSupply;
    }
}
