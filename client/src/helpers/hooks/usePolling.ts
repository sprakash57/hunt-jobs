import { useEffect, useRef } from "react";

const usePolling = (callback: VoidFunction, delay: number | null) => {
    const previousCallback = useRef<VoidFunction>(() => { });

    useEffect(() => {
        previousCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => previousCallback.current();
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => {
                clearInterval(id);
            };
        }
    }, [callback, delay])
}

export default usePolling;
