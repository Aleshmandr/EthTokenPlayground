# EthTokenPlayground
ERC-20 token realization, smart contracts playground

Required dependencies:

- Node.js (https://nodejs.org/en/download/)
- Truffle framework (https://trufflesuite.com/truffle)
- Ganache (https://trufflesuite.com/ganache)
- Metamask browser extension (https://metamask.io/)

[ERC-20 token standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)

##### Truffle commands:

Enter console:
`$ truffle console`

Exit console:
`$ .exit`

Run tests:
`$ truffle test`

Migration: 
`$ truffle migrate --reset`

Get token:  
`$ PapToken.deployed().then(function(i){token=i;})`

Get total supply:
`$ token.totalSupply().then(function(s){totalSupply = s;})`
`$ totalSupply.toNumber()`


