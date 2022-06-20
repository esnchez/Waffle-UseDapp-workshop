pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract WaffleToken is IERC20 {
    string public constant name = "WaffleToken";
    string public constant symbol = "WFL";
    uint8 public constant decimals = 18;
    uint256 public tokenSupply;
    address public contractOwner;

    mapping(address => uint) balances;

    //owner -> spenders -> tokens
    //i can spend tokens of another person , pattern
    mapping(address => mapping(address => uint)) allowances;


    constructor(uint _initialBalance) {
        tokenSupply = _initialBalance;
        balances[msg.sender] = tokenSupply;
        contractOwner = msg.sender;


    }

    modifier onlyOwner() {
        require( contractOwner == msg.sender);
        _;
    }

    function totalSupply() external view override returns (uint256) {
        // revert('Not Implemented');
        uint256 supply =  tokenSupply;
        return supply;
    }

    function balanceOf(address account) external view override returns (uint256) {
        // revert('Not Implemented');
        //requierement that exists in our mapping
        require(account != address(0), "try a valid address");
        uint256 individualBalance = balances[account];
        return individualBalance;
    }

    function transfer(address recipient, uint256 amount) external override returns (bool) {
        // revert('Not Implemented');
        require(recipient != address(0), "try a valid address");
        require(amount > 0, "specify amount to be transferred");
         require( balances[msg.sender] >= amount, "cannot transfer more tokens than I have");
        
        //Update the balances
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }
    
    
    // Part 2
    

    function allowance(address owner, address spender) external override view returns (uint256) {
        // revert('Not Implemented');
        return allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) external override onlyOwner() returns (bool) {
        // revert('Not Implemented');

        //not += as we are setting what is allowed, 
        //and can be set 0 if we want to quit that priviledge
        allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) external override returns (bool) {
        // revert('Not Implemented');
        require(balances[sender] >= amount, "cannot send that qty of tokens"); 
        require(allowances[sender][msg.sender] >= amount, "this qty of tokens has to be previously approved"); 

        balances[sender] -= amount;
        balances[recipient] += amount;
        allowances[sender][msg.sender] -= amount;
        
        emit Transfer(sender, recipient, amount);
        return true;
    }

}
