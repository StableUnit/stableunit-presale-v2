import { useContext } from "react";

import { StateContext } from "reducer/constants";
import { CommonFactory } from "utils/api";
import { getAddress, getDecimals, SupportedTokensType } from "utils/currency";
import { toHRNumber } from "utils/bigNumber";

import { useParameter } from "./useParameter";

export const useBalance = (currency: SupportedTokensType, showBalance = true) => {
    const { chainId } = useContext(StateContext);
    const decimals = getDecimals(currency, chainId);
    const tokenAddress = getAddress(currency, chainId);
    const balanceBN = useParameter(
        `balance ${currency}`,
        () => CommonFactory.balance(tokenAddress),
        tokenAddress,
        showBalance
    );

    return {
        balanceBN,
        balance: decimals && balanceBN ? toHRNumber(balanceBN, decimals) : 0,
    };
};
