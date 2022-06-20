pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * TokenSplitter
 * Splits transferred tokens
 */

contract TokenSplitter {
    IERC20 public token;
    address payable[] tokenOwnerList;


    constructor(IERC20 _token, address payable[] memory _addresses ) {
        token = _token;
        tokenOwnerList = _addresses;

    }

    function split(uint256 amount) external{
        uint256 amountToBeSplitted = amount/2; 

        
        for(uint i=0; i < tokenOwnerList.length ; i++){
            address payable recipient = tokenOwnerList[i];
            token.transferFrom(msg.sender, recipient, amountToBeSplitted);
        }

    }
}
