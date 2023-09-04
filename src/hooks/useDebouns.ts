import { useCallback, useRef } from 'react'


type CallbackFunction = (...args: any[]) => void;
function useDebounce(callback: CallbackFunction, delay: number): CallbackFunction {
    const timer = useRef<any>();

    const debouncedCallback = useCallback((...args: any[]) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay])

    return debouncedCallback
}

export default useDebounce