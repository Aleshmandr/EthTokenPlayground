pragma solidity ^0.8.10;

contract MyHyperverseToken {
    
    string public name = "My Hyperverse Token";
    string public symbol = "MHV";
    string public standard = "My Hyperverse Token v1.0";

    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    constructor(uint256 _totalSupply) {
        balanceOf[msg.sender] = _totalSupply;
        totalSupply = _totalSupply;
    }
}
