import { useCallback, useContext, useEffect, useState } from "react";
import BigNumber from "bignumber.js";

import { StateContext } from "reducer/constants";

import { useUpdate } from "../useUpdate";

export const useParameter = <T = BigNumber>(
    name: string,
    getParameter: () => Promise<T | undefined>,
    dependency?: any,
    needToCallGetter = true
) => {
    const { currentAddress, chainId } = useContext(StateContext);
    const [result, setResult] = useState<T>();

    const updateParameter = useCallback(async () => {
        if (currentAddress && chainId && needToCallGetter) {
            try {
                const newResult = await getParameter();
                setResult(newResult);
            } catch (e) {
                setResult(undefined);
            }
        }
    }, [currentAddress, chainId, dependency, needToCallGetter]);

    useUpdate(name, updateParameter);

    useEffect(() => {
        updateParameter();
    }, [updateParameter]);

    return result;
};
