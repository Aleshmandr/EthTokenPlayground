// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract MyHyperverseToken {
    
    string public name = "My Hyperverse Token";
    string public symbol = "MHV";
    string public standard = "My Hyperverse Token v1.0";

    uint256 private totalSupplyValue;

    mapping(address => uint256) public balanceOf;

    mapping(address => mapping(address => uint256)) public allowance;

    constructor(uint256 initialTotalSupply) {
        balanceOf[msg.sender] = initialTotalSupply;
        totalSupplyValue = initialTotalSupply;
    }

    function totalSupply() public view returns(uint256){
        return totalSupplyValue;
    }

    function transfer(address to, uint256 value) public returns (bool success){
        require(balanceOf[msg.sender] >= value);
        balanceOf[msg.sender]-=value;
        balanceOf[to]+=value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public returns (bool success){

    }

    function approve(address spender, uint256 value) public returns (bool success){
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 value
    );
}
