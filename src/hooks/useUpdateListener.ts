import { useContext, useEffect } from "react";
import { Actions } from "reducer";
import { DispatchContext, StateContext } from "reducer/constants";

export const useUpdateListener = () => {
    const { updatePool, updateFlag } = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    useEffect(() => {
        if (dispatch && updatePool?.length === 0 && updateFlag === true) {
            dispatch({ type: Actions.SetUpdateFlag, payload: false });
        }
    }, [dispatch, updatePool, updateFlag]);
};
