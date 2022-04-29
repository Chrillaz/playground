import { localStorageRead, localStorageWrite } from '@utilities';
import { useCallback, useEffect, useState } from 'react';

export const useLocalState = <T extends {[key: string]: unknown}>(initialState: T) => {

    const STORE_KEY = 'local_state';

    const [localState, setLocalState] = useState<T>(localStorageRead(STORE_KEY) as T)

    const setState = useCallback(<T>(value: T): void => {

        setLocalState(
            localStorageWrite(STORE_KEY, {
                ...localState,
                ...value
            }) as any
        );
    }, []);

    useEffect(() => {

        const localState = localStorageRead(STORE_KEY);

        for (const key in initialState) {

            if(!localState[key]) {

                setState({[key]: initialState[key]});
            }
        }
    }, []);

    return [localState, setState];
}