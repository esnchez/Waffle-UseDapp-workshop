import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { Rinkeby, DAppProvider, Config, ArbitrumRinkeby } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'



const config: Config = {
    readOnlyChainId: Rinkeby.chainId,
    readOnlyUrls: {
      [Rinkeby.chainId]: getDefaultProvider('rinkeby'),
      [ArbitrumRinkeby.chainId]: "https://rinkeby.arbitrum.io/rpc",

    },
}

ReactDOM.render(
<DAppProvider config={config}>
    <App />
</DAppProvider>

, document.getElementById('root'))
