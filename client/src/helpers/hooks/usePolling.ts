import { useEffect, useRef } from "react";

function usePolling(callback: VoidFunction, delay: number | null) {
    const previousCallback = useRef<VoidFunction>(() => { });

    useEffect(() => {
        previousCallback.current = callback;
    }, [callback])

    useEffect(() => {
        function tick() {
            previousCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => {
                console.log(id);
                clearInterval(id);
            };
        }
    }, [callback, delay])
}

export default usePolling;
