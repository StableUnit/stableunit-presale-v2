import BigNumber from "bignumber.js";

const MAX_FRACTION_DIGIT = 4;

export const toHRNumber = (value: BigNumber, decimals: number, fraction = MAX_FRACTION_DIGIT) =>
    +value.dividedBy(new BigNumber(10).exponentiatedBy(decimals)).toNumber().toFixed(fraction);

// export const toHRNumber = (value: BigNumber, decimals: number) =>
//     +value.shiftedBy(-decimals).toNumber().toFixed(MAX_FRACTION_DIGIT);

export const fromHRNumber = (value: number, decimals: number) =>
    new BigNumber(value).multipliedBy(new BigNumber(10).exponentiatedBy(decimals));

export const createBNeDecimal = (decimals: number) => new BigNumber(10).pow(decimals);

export const BN_1E18 = createBNeDecimal(18);

export const getHRPriceUSD = (value: number, tokenPrice: BigNumber, decimal: number) =>
    new BigNumber(value)
        .multipliedBy(createBNeDecimal(decimal))
        .multipliedBy(tokenPrice)
        .div(createBNeDecimal(36))
        .toNumber();
