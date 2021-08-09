import { useEffect, useRef } from "react";

const usePolling = (callback: VoidFunction, delay: number) => {
    const previousCallback = useRef<VoidFunction>();

    useEffect(() => {
        previousCallback.current = callback;
    }, [callback])

    useEffect(() => {
        if (delay) {
            const id = setInterval(() => {
                previousCallback.current!()
            }, delay);
            return () => {
                clearInterval(id);
            };
        }
    }, [callback, delay])
}

export default usePolling;
