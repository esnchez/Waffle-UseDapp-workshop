// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * EtherSplitter
 * Splits transferred Ether
 */



contract EtherSplitter {

 address payable public firstAdr;
 address payable public secondAdr;
 mapping (address => uint256) balances;

 event FundsSplit(address indexed _from, uint _value);
 event RemainderReturned(address indexed _from, uint _value);

    constructor(address payable _firstAdr, address payable _secondAdr) {
        firstAdr = _firstAdr;
        secondAdr = _secondAdr;
    }

    function receiveFundsAndSplit() payable external{
        require(msg.value > 0, "need to transfer funds");
        uint256 valueSplitted = msg.value/2;
        uint256 remainder = msg.value % 2;

        (bool success1, ) = firstAdr.call{value: valueSplitted }("");
        require(success1, "transfer failed!");
        balances[firstAdr] += valueSplitted;
        emit FundsSplit(firstAdr, valueSplitted);

        (bool success2, ) = secondAdr.call{value: valueSplitted }("");
        require(success2, "transfer failed!");
        balances[secondAdr] += valueSplitted;
        emit FundsSplit(secondAdr, valueSplitted);

        if(remainder != 0){
        (bool success3, ) = payable(msg.sender).call{value: remainder }("");
        require(success3, "transfer of remainder has failed!");
        emit RemainderReturned(msg.sender, remainder);
        }

        
      

    }
}
