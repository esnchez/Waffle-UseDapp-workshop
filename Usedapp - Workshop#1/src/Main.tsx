// import React from 'react'
import type {ChangeEvent} from 'react'
import { useState } from 'react'
// import "./Main.css"

//for connecting with the wallet
import { formatEther, formatUnits } from '@ethersproject/units'
import {  useEtherBalance, useEthers, useContractFunction, useTokenBalance , useToken} from '@usedapp/core'
import {MOCK_USDC, ABI} from  "./constants"

//for interacting with contract deployed
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'



const Main = () => {

  //consts for connecting with wallet, showing balances..
  const { activateBrowserWallet, deactivate, account } = useEthers()
  const userEthBalance = useEtherBalance(account)
  const stakingBalance = useEtherBalance(MOCK_USDC)

    // so this hook below is controlled by usedapp..
    // const [balance, setBalance] = useState<number>(0)
    const [mintAmount, setMintAmount] = useState<string>("")
    const [transferAmount, setTransferAmount] = useState<string>("")
    const [recipient, setRecipient] = useState<string>("")



    //interacting with smart contract
    const wethInterface = new utils.Interface(ABI)
    const contract = new Contract(MOCK_USDC, wethInterface)

    const { state, send } = useContractFunction(contract, 'mint', { transactionName: 'Wrap' })
    const { send: transfer } = useContractFunction(contract, 'transfer', { transactionName: 'Wrap' })
    const { status } = state

    const contractTokenBalance = useToken(MOCK_USDC)

    const userTokenBalance = useTokenBalance(MOCK_USDC, account)



    const handleInput = (e: ChangeEvent<HTMLInputElement>, setter : React.Dispatch<React.SetStateAction<string>>) => {
      e.preventDefault();
      setter(e.target.value);
    }

    const mint = () => {
     send(account , utils.parseUnits(mintAmount,6))
    }

    const callTransfer = () => {
      transfer(account , utils.parseUnits(transferAmount,6))
     }


  return (
    <div className='main'>

      {!account && <button onClick={activateBrowserWallet}> Connect </button>}
      {account && <button onClick={deactivate}> Disconnect </button>}
      {account && <p>Account: {account}</p>}


      <div className='userEthBalance'>
      {userEthBalance && <p>Ether balance: {formatEther(userEthBalance)} ETH </p>}
      </div>

      <div className='balance'>
      {stakingBalance && <p>ETH2 staking balance: {formatEther(stakingBalance)} ETH </p>}
      </div>

      <div className='userBalance'>
      {userTokenBalance && <p>Token balance: {formatUnits(userTokenBalance, 6)} Tokens </p>}
      </div>

      <div className='mintInput'>
        <input type="text" value={mintAmount} onChange={e => handleInput(e, setMintAmount)}></input>
        <p>Status: {status}</p>
      </div>

      <button onClick={mint}>Mint</button>

      <div>
        <div className='transferInput'>
          <div>Recipient's Address</div>
          <input type="text" value={recipient} onChange={e => handleInput(e, setRecipient)}></input>

          <div>Amount</div>
          <input type="text" value={transferAmount} onChange={e => handleInput(e, setTransferAmount)}></input>
          <p>Status: {status}</p>
        </div>

        <button onClick={callTransfer}>Transfer Tokens</button>
      </div>
      
    </div>
  )
}

export default Main;