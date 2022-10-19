import React from "react";

import { ActionType, ReducerState } from "./index";

export const initialState: ReducerState = {
    chainId: undefined,
    currentAddress: undefined,
    isNetworkModalVisible: false,
    web3: undefined,
    updateFlag: undefined,
    updatePool: undefined,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<ActionType>>(() => null);
