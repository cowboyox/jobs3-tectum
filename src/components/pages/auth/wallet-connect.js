'use client'

import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage, State, WagmiProvider } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { createWeb3Modal } from '@web3modal/wagmi/react'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '905b3d24b01e0ca2b1c741cc9bbb839a'

// 2. Create wagmiConfig
const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
const chains = [mainnet, sepolia]
const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage
    }),
})
// 3. Create modal
// createWeb3Modal({ wagmiConfig, projectId, chains })

// Create modal
createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true // Optional - false as default
})

export function Web3Modal({ children }) {
    return <WagmiProvider config={config}>{children}</WagmiProvider>;
}