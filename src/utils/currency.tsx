import React from "react";

import tokenList from "submodule-contract-artifacts/stableunit.tokenlist.json";
import { UsdProIcon, DAIIcon, UsdtIcon } from "ui-kit/images/currency";
import { TokenMetadata } from "./types";

export type SupportedTokensType = "DAI" | "USDPro" | "tUSDT" | "USDT";

export const BORROW_CURRENCY = "USDPro" as SupportedTokensType;
export const BORROW_CURRENCY_NAME = "USD Pro" as SupportedTokensType;

export const getSupportedTokens = (chainId: number) => tokenList.tokens.filter((v) => v.chainId === chainId);
export const getSupportedTokensAddresses = (chainId: number) => getSupportedTokens(chainId).map((v) => v.address);
export const getSupportedTokensAddressesNoSU = (chainId: number) =>
    getSupportedTokens(chainId)
        .filter((v) => v.symbol !== BORROW_CURRENCY)
        .map((v) => v.address);

export const getTokenByName = (name: SupportedTokensType, chainId: number | undefined) =>
    tokenList.tokens.find((v) => v.symbol === name && v.chainId === chainId);

export const getAddress = (name: SupportedTokensType, chainId: number | undefined) =>
    getTokenByName(name, chainId)?.address;

export const getName = (address: string, chainId: number | undefined) =>
    tokenList.tokens.find((v) => v.address === address && v.chainId === chainId)?.symbol as
        | SupportedTokensType
        | undefined;

export const getDecimals = (name: SupportedTokensType, chainId: number | undefined) =>
    getTokenByName(name, chainId)?.decimals;

export const getTokenIcon = (tokenName: SupportedTokensType) => {
    switch (tokenName) {
        case "DAI":
            return <DAIIcon />;
        case "USDT":
        case "tUSDT":
            return <UsdtIcon />;
        case "USDPro":
            return <UsdProIcon />;
        default:
            return null;
    }
};

export const addToMetamask = (tokenMetadata: TokenMetadata) =>
    window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
            type: "ERC20",
            options: tokenMetadata,
        },
    });
