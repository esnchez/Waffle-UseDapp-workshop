import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { Rinkeby, DAppProvider, Config } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'



const config: Config = {
    readOnlyChainId: Rinkeby.chainId,
    readOnlyUrls: {
      [Rinkeby.chainId]: getDefaultProvider('rinkeby'),
    },
}

ReactDOM.render(
<DAppProvider config={config}>
    <App />
</DAppProvider>

, document.getElementById('root'))
