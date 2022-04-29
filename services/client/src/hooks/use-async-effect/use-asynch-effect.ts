import { useEffect, useRef } from 'react';

type UnsubscribeCallback = () => void;

type Unsubscribe<T> = (callback: T) => void;

type Callback<T> = (subscribed: boolean, unsubscribe: Unsubscribe<T>) => void;

export const useAsyncEffect = (callback: Callback<UnsubscribeCallback>, deps: any[]) => {

    const subscribed = useRef(false);

    const unsubscribe = useRef<UnsubscribeCallback>(null);

    const setUnsubscribe = (callback: UnsubscribeCallback): void => {

        unsubscribe.current = callback;
    }

    useEffect(() => {
        subscribed.current = true;
        
        callback(subscribed.current, setUnsubscribe);

        return () => {
            subscribed.current = false;
            unsubscribe.current();
            setUnsubscribe(null);
        }
    }, deps);
}