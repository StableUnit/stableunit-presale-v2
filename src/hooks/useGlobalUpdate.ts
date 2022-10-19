import { useCallback, useContext } from "react";
import { Actions } from "reducer";
import { DispatchContext } from "reducer/constants";

/** useGlobalUpdate is for calling 'update' to update all parameters that have 'useUpdate' hook.
 * To make it all work you should use 'useUpdateListener' in App.tsx */

export const useGlobalUpdate = () => {
    const dispatch = useContext(DispatchContext);

    const update = useCallback(() => {
        dispatch({ type: Actions.SetUpdateFlag, payload: true });
    }, [dispatch]);

    return {
        update,
    };
};
