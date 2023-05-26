import Web3 from "web3";

import { DistributionDataType, DistributionDataTypeExpanded } from "utils/types";

// eslint-disable-next-line no-shadow
export enum Actions {
    SetCurrentAddress = "SET_CURRENT_ADDRESS",
    SetChainId = "SET_CHAIN",
    SetIsNetworkModalVisible = "SET_IS_NETWORK_MODAL_VISIBLE",
    SetWeb3 = "SET_WEB3",
    SetUpdateFlag = "SET_UPDATE_FLAG",
    AddToUpdatePool = "ADD_TO_UPDATE_POOL",
    RemoveFromUpdatePool = "REMOVE_FROM_UPDATE_POOL",
}

export type ActionType =
    | {
          type: Actions.SetCurrentAddress;
          payload: string | undefined;
      }
    | {
          type: Actions.SetIsNetworkModalVisible;
          payload: boolean;
      }
    | {
          type: Actions.SetWeb3;
          payload: Web3 | undefined;
      }
    | {
          type: Actions.SetUpdateFlag;
          payload: boolean | undefined;
      }
    | {
          type: Actions.AddToUpdatePool;
          payload: string;
      }
    | {
          type: Actions.RemoveFromUpdatePool;
          payload: string;
      }
    | {
          type: Actions.SetChainId;
          payload: number | undefined;
      };

export interface ReducerState {
    currentAddress?: string;
    chainId?: number;
    isNetworkModalVisible: boolean;
    web3?: Web3;
    updateFlag?: boolean;
    updatePool?: string[];
}

const reducer: (state: ReducerState, action: ActionType) => ReducerState = (state, action) => {
    switch (action.type) {
        case Actions.SetCurrentAddress:
            return {
                ...state,
                currentAddress: action.payload,
            };
        case Actions.SetChainId:
            return {
                ...state,
                chainId: action.payload,
            };
        case Actions.SetIsNetworkModalVisible: {
            return {
                ...state,
                isNetworkModalVisible: action.payload,
            };
        }
        case Actions.SetUpdateFlag: {
            return {
                ...state,
                updateFlag: action.payload,
            };
        }
        case Actions.AddToUpdatePool: {
            const haveKey = state.updatePool?.find((v) => v === action.payload);
            return {
                ...state,
                updatePool: haveKey ? state.updatePool : [...(state.updatePool ?? []), action.payload],
            };
        }
        case Actions.RemoveFromUpdatePool: {
            return {
                ...state,
                updatePool: state.updatePool?.filter((v) => v !== action.payload),
            };
        }
        case Actions.SetWeb3: {
            return {
                ...state,
                web3: action.payload,
            };
        }
        default:
            return state;
    }
};

export default reducer;
