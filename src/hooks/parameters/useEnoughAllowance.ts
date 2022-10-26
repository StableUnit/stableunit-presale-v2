import { useContext, useEffect, useState } from "react";
import { StateContext } from "reducer/constants";
import { CommonFactory } from "utils/api";

export const useEnoughAllowance = (tokenAddress?: string, address?: string) => {
    const { currentAddress, chainId } = useContext(StateContext);
    const [isEnoughAllowance, setIsEnoughAllowance] = useState(false);

    const updateAllowance = async () => {
        if (currentAddress && tokenAddress && chainId) {
            const allowance = await CommonFactory.allowance(tokenAddress, address ?? currentAddress);
            setIsEnoughAllowance(!allowance.isZero());
        }
    };

    useEffect(() => {
        updateAllowance();
    }, [tokenAddress, currentAddress, address, chainId]);

    return {
        isEnoughAllowance,
        setIsEnoughAllowance: (value: boolean) => setIsEnoughAllowance(value),
    };
};
