import Web3 from "web3";

export type NetworkType =
    | "eth"
    | "goerli"
    | "polygon"
    | "bsc"
    | "fantom"
    | "avalanche"
    | "aurora"
    | "harmony"
    | "unsupported";

export const NETWORK: Record<NetworkType, NetworkType> = {
    eth: "eth",
    goerli: "goerli",
    polygon: "polygon",
    aurora: "aurora",
    harmony: "harmony",
    bsc: "bsc",
    fantom: "fantom",
    avalanche: "avalanche",
    unsupported: "unsupported",
};

export const supportedNetworks = [NETWORK.goerli];

export const networkNames = {
    [NETWORK.eth]: "Ethereum",
    [NETWORK.polygon]: "Polygon",
    [NETWORK.goerli]: "Goerli",
    [NETWORK.aurora]: "Aurora",
    [NETWORK.harmony]: "Harmony",
    [NETWORK.bsc]: "Binance Smart Chain",
    [NETWORK.fantom]: "Fantom",
    [NETWORK.avalanche]: "Avalanche",
};

export const getNetworkNameById: (chainId?: number) => NetworkType | undefined = (chainId) => {
    switch (chainId) {
        case 1:
            return NETWORK.eth;
        case 5:
            return NETWORK.goerli;
        case 56:
            return NETWORK.bsc;
        case 137:
            return NETWORK.polygon;
        case 250:
            return NETWORK.fantom;
        case 43114:
            return NETWORK.avalanche;
        case 1313161554:
            return NETWORK.aurora;
        case 1666600000:
            return NETWORK.harmony;
        case undefined:
            return undefined;
        default:
            return NETWORK.unsupported;
    }
};
export const getIdByNetworkName: (name: NetworkType) => number = (name) => {
    switch (name) {
        case NETWORK.eth:
            return 1;
        case NETWORK.goerli:
            return 5;
        case NETWORK.bsc:
            return 56;
        case NETWORK.polygon:
            return 137;
        case NETWORK.fantom:
            return 250;
        case NETWORK.avalanche:
            return 43114;
        case NETWORK.aurora:
            return 1313161554;
        case NETWORK.harmony:
            return 1666600000;
        default:
            return 0;
    }
};

export const DEFAULT_NETWORK = NETWORK.goerli;
export const DEFAULT_NETWORK_ID = getIdByNetworkName(DEFAULT_NETWORK);

export const networkInfo = {
    [NETWORK.eth]: {
        chainName: "Ethereum Mainnet",
        chainId: Web3.utils.toHex(getIdByNetworkName(NETWORK.eth)),
        blockExplorerUrls: ["https://etherscan.io"],
        rpcUrls: ["https://rpc.ankr.com/eth"],
    },
    [NETWORK.goerli]: {
        chainName: "Goerli",
        chainId: Web3.utils.toHex(getIdByNetworkName(NETWORK.goerli)),
        blockExplorerUrls: ["https://goerli.etherscan.io"],
        rpcUrls: ["https://goerli.infura.io/v3"],
        nativeCurrency: {
            name: "GoerliETH",
            symbol: "GoerliETH",
            decimals: 18,
        },
    },
    [NETWORK.bsc]: {
        chainName: "Binance Smart Chain Mainnet",
        chainId: Web3.utils.toHex(getIdByNetworkName(NETWORK.bsc)),
        rpcUrls: ["https://bsc-dataseed.binance.org/"],
        blockExplorerUrls: ["https://bscscan.com"],
        nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18,
        },
    },
    [NETWORK.polygon]: {
        chainName: "Polygon Mainnet",
        chainId: Web3.utils.toHex(getIdByNetworkName(NETWORK.polygon)),
        rpcUrls: ["https://polygon-rpc.com/"],
        blockExplorerUrls: ["https://polygonscan.com/"],
        nativeCurrency: {
            name: "MATIC Token",
            symbol: "MATIC Token",
            decimals: 18,
        },
    },
    [NETWORK.fantom]: {
        chainName: "Fantom Opera",
        chainId: Web3.utils.toHex(getIdByNetworkName(NETWORK.fantom)),
        rpcUrls: ["https://rpc.ftm.tools/"],
        blockExplorerUrls: ["https://ftmscan.com"],
        nativeCurrency: {
            name: "FTM",
            symbol: "FTM",
            decimals: 18,
        },
    },
    [NETWORK.avalanche]: {
        chainName: "Avalanche C-Chain",
        chainId: Web3.utils.toHex(getIdByNetworkName(NETWORK.avalanche)),
        rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
        blockExplorerUrls: ["https://snowtrace.io"],
        nativeCurrency: {
            name: "AVAX",
            symbol: "AVAX",
            decimals: 18,
        },
    },
    [NETWORK.aurora]: {
        chainName: "Aurora Mainnet",
        chainId: Web3.utils.toHex(getIdByNetworkName(NETWORK.aurora)),
        rpcUrls: ["https://mainnet.aurora.dev"],
        blockExplorerUrls: ["https://aurorascan.dev"],
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
        },
    },
    [NETWORK.harmony]: {
        chainName: "Harmony Mainnet",
        chainId: Web3.utils.toHex(getIdByNetworkName(NETWORK.harmony)),
        rpcUrls: ["https://api.harmony.one"],
        blockExplorerUrls: ["https://explorer.harmony.one/"],
        nativeCurrency: {
            name: "ONE",
            symbol: "ONE",
            decimals: 18,
        },
    },
};

export const changeNetworkAtMetamask = async (chainId?: number) => {
    if (!chainId) {
        return;
    }
    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: Web3.utils.toHex(chainId) }],
        });
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        // @ts-ignore
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [networkInfo[getNetworkNameById(chainId) ?? ""]],
                });
            } catch (addError) {
                console.error(addError);
            }
        }
    }
};

export const getShortAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(address.length - 3)}`;

export const getEtherscanAddress = (address: string) => `https://goerli.etherscan.io/address/${address}`;

export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
