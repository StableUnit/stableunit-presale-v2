import Web3 from "web3";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { Contract } from "web3-eth-contract";

import CONTRACT_ERC20 from "contracts/ERC20.json";
import Bonus from "contracts/Bonus.json";
import Distributor from "contracts/TokenDistributor_v4.json";
import SuDAO from "contracts/SuDAO.json";
import VeERC20 from "contracts/veERC20.json";
import { DistributionDataType } from "./types";

type ContractsType = "BonusContract" | "DistributorContract" | "SuDAOContract" | "VeERC20Contract";

export const contracts: Record<ContractsType, Contract | undefined> = {
    BonusContract: undefined,
    DistributorContract: undefined,
    SuDAOContract: undefined,
    VeERC20Contract: undefined,
};

export const initAllContracts = (web3: Web3) => {
    setBonusContract(new web3.eth.Contract(Bonus.abi as any, Bonus.address));
    setDistributorContract(new web3.eth.Contract(Distributor.abi as any, Distributor.address));
    setSuDAOContract(new web3.eth.Contract(SuDAO.abi as any, SuDAO.address));
    setVeERC20Contract(new web3.eth.Contract(VeERC20.abi as any, VeERC20.address));
};

export const setBonusContract = (newContract: Contract) => {
    contracts.BonusContract = newContract;
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

export const BonusFactory = {
    getAllocation: async (address: string) => {
        if (address && contracts.BonusContract) {
            return new BigNumber(await contracts.BonusContract.methods.getAllocation(address).call());
        }
        return undefined;
    },
    getDiscount: async (address: string) => {
        if (address && contracts.BonusContract) {
            return new BigNumber(await contracts.BonusContract.methods.getDiscount(address).call());
        }
        return undefined;
    },
};

export const DistributorFactory = {
    getDistributionStaticData: async () => {
        if (contracts.DistributorContract) {
            return (await contracts.DistributorContract.methods
                .getDistributorStaticData()
                .call()) as DistributionDataType;
        }
        return undefined;
    },
    getTotalDonation: async () => {
        if (contracts.DistributorContract) {
            return new BigNumber(await contracts.DistributorContract.methods.totalDonations().call());
        }
        return undefined;
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
    balance: async (tokenAddress?: string) => {
        if (!web3 || !tokenAddress || !currentAddress) {
            return new BigNumber(0);
        }

        const tokenContract = new web3.eth.Contract(CONTRACT_ERC20 as any, tokenAddress);
        return new BigNumber(await tokenContract.methods.balanceOf(currentAddress).call());
    },
};

export const isAddress = (address?: string) => address?.startsWith("0x") || address?.includes(".eth");

export const ensToAddress = async (ens?: string) =>
    ens?.includes(".eth") ? ethers.providers.getDefaultProvider().resolveName(ens) : ens;
