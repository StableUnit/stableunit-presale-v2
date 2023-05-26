import Web3 from "web3";
import BigNumber from "bignumber.js";
import { Contract } from "web3-eth-contract";

import CONTRACT_ERC20 from "contracts/ERC20.json";
import Distributor from "contracts/SuDAOUpgrader.json";
import SuDAO from "contracts/SuDAO.json";
import VeERC20 from "contracts/VeERC20v2.json";
import { SupportedTokensType } from "./currency";

type ContractsType = "DistributorContract" | "SuDAOContract" | "VeERC20Contract";

export const contracts: Record<ContractsType, Contract | undefined> = {
    DistributorContract: undefined,
    SuDAOContract: undefined,
    VeERC20Contract: undefined,
};

export const initAllContracts = (web3: Web3) => {
    setDistributorContract(new web3.eth.Contract(Distributor.abi as any, Distributor.address));
    setSuDAOContract(new web3.eth.Contract(SuDAO.abi as any, SuDAO.address));
    setVeERC20Contract(new web3.eth.Contract(VeERC20.abi as any, VeERC20.address));
};

export const setDistributorContract = (newContract: Contract) => {
    contracts.DistributorContract = newContract;
};
export const setSuDAOContract = (newContract: Contract) => {
    contracts.SuDAOContract = newContract;
};
export const setVeERC20Contract = (newContract: Contract) => {
    contracts.VeERC20Contract = newContract;
};

let currentAddress: string;
export const setUtilsCurrentAddress = (newAddress: string) => {
    currentAddress = newAddress;
};

let web3: Web3;
export const setUtilsWeb3 = (newWeb3: Web3) => {
    web3 = newWeb3;
};

const tryToRunLocal = async (command: any, options: Record<string, any> = {}) => {
    await command.estimateGas({ from: currentAddress, ...options });
    return command;
};

export const DistributorFactory = {
    participate: async (donationAmount: BigNumber) => {
        if (contracts.DistributorContract && currentAddress) {
            return contracts.DistributorContract.methods
                .participate(donationAmount.toString(10))
                .send({ from: currentAddress });
        }
    },
};

export const CommonFactory = {
    createCurrencyContract: (address: string) => {
        const newWeb3 = web3 ?? new Web3(Web3.givenProvider);
        if (newWeb3 && address) {
            return new newWeb3.eth.Contract(CONTRACT_ERC20 as any, address);
        }
        return undefined;
    },
    approve: async (address?: string) => {
        if (address) {
            const tokenContract = CommonFactory.createCurrencyContract(address);
            const command = await tryToRunLocal(
                tokenContract?.methods.approve(
                    Distributor.address,
                    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                )
            );
            return command.send({ from: currentAddress });
        }
    },
    allowance: async (tokenAddress: string, address = currentAddress) => {
        if (!address || !tokenAddress) {
            return new BigNumber(0);
        }
        const tokenContract = CommonFactory.createCurrencyContract(tokenAddress);
        return new BigNumber(await tokenContract?.methods.allowance(address, Distributor.address).call());
    },
    balance: async (tokenAddress?: string) => {
        if (!web3 || !tokenAddress || !currentAddress) {
            return new BigNumber(0);
        }

        const tokenContract = new web3.eth.Contract(CONTRACT_ERC20 as any, tokenAddress);
        return new BigNumber(await tokenContract.methods.balanceOf(currentAddress).call());
    },
    decimals: async (tokenAddress?: string) => {
        if (!web3 || !tokenAddress) {
            return 0;
        }

        const tokenContract = new web3.eth.Contract(CONTRACT_ERC20 as any, tokenAddress);
        return +(await tokenContract.methods.decimals().call());
    },
    symbol: async (tokenAddress?: string) => {
        if (!web3 || !tokenAddress) {
            return undefined;
        }

        const tokenContract = new web3.eth.Contract(CONTRACT_ERC20 as any, tokenAddress);
        return (await tokenContract.methods.symbol().call()) as SupportedTokensType;
    },
};
