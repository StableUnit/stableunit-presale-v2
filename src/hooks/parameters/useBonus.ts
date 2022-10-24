import { useContext, useEffect, useState } from "react";
import BigNumber from "bignumber.js";

import { StateContext } from "reducer/constants";
import { toHRNumber } from "utils/bigNumber";
import { BonusFactory } from "utils/api";

export const useBonus = () => {
    const { currentAddress } = useContext(StateContext);
    const [allocationBN, setAllocationBN] = useState<BigNumber>();
    const [discountBN, setDiscountBN] = useState<BigNumber>();

    const updateData = async () => {
        if (currentAddress) {
            setAllocationBN(await BonusFactory.getAllocation(currentAddress));
            setDiscountBN(await BonusFactory.getDiscount(currentAddress));
        }
    };

    useEffect(() => {
        updateData();
    }, [currentAddress]);

    return {
        allocation: allocationBN ? toHRNumber(allocationBN, 18) : undefined,
        discount: discountBN ? toHRNumber(discountBN.multipliedBy(100), 18) : undefined,
    };
};
