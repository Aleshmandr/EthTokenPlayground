pragma solidity ^0.8.10;

contract MyHyperverseToken {
    
    string public name = "My Hyperverse Token";
    string public symbol = "MHV";
    string public standard = "My Hyperverse Token v1.0";

    uint256 private _totalSupply;

    mapping(address => uint256) public balanceOf;

    constructor(uint256 initialTotalSupply) {
        balanceOf[msg.sender] = initialTotalSupply;
        _totalSupply = initialTotalSupply;
    }

    function totalSupply() public view returns(uint256){
        return _totalSupply;
    }

    function transfer(address to, uint256 value) public returns (bool success){
        require(balanceOf[msg.sender] >= value);
        balanceOf[msg.sender]-=value;
        balanceOf[to]+=value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 value
    );
}
