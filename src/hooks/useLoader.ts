import { useCallback, useState } from "react";

export const useLoader = (defaultIsLoading = false) => {
    const [isLoading, setIsLoading] = useState(defaultIsLoading);
    const start = useCallback(() => setIsLoading(true), [setIsLoading]);
    const stop = useCallback(() => setIsLoading(false), [setIsLoading]);

    return {
        isLoading,
        start,
        stop,
    };
};
