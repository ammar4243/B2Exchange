import { cookieStorage, createConfig, createStorage, http } from 'wagmi'
import { injected, walletConnect } from 'wagmi/connectors'
import { arbitrum, avalanche, base, bsc, mainnet, optimism, polygon } from 'wagmi/chains'

export const supportedChains = [mainnet, bsc, polygon, arbitrum, optimism, base, avalanche] as const

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

export const wagmiConfig = createConfig({
  chains: supportedChains,
  connectors: [
    injected({ shimDisconnect: true }),
    ...(projectId ? [walletConnect({ projectId, showQrModal: false })] : []),
  ],
  storage: createStorage({ storage: cookieStorage }),
  transports: Object.fromEntries(supportedChains.map((chain) => [chain.id, http()])),
  ssr: true,
})

export const chainNames = Object.fromEntries(supportedChains.map((chain) => [chain.id, chain.name])) as Record<number, string>
export const hasWalletConnectConfig = Boolean(projectId)
export const hasRouterConfig = Boolean(process.env.NEXT_PUBLIC_ROUTER_ADDRESS)
export const hasTokenFactoryConfig = Boolean(process.env.NEXT_PUBLIC_TOKEN_FACTORY_ADDRESS)

export const explorerUrl = (chainId: number, hash: string) => {
  const chain = supportedChains.find((item) => item.id === chainId)
  return chain?.blockExplorers?.default.url ? `${chain.blockExplorers.default.url}/tx/${hash}` : '#'
}

export const shortAddress = (address?: string) => address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''

export const getChainEnvKey = (chainId: number) => `NEXT_PUBLIC_ROUTER_ADDRESS_${chainId}`
export const getRouterAddress = (chainId?: number) => chainId ? process.env[getChainEnvKey(chainId)] ?? process.env.NEXT_PUBLIC_ROUTER_ADDRESS : undefined
