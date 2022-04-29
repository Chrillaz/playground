import { renderHook, waitFor } from '@testing-library/react';
import { useLocalState } from './use-local-state';
import * as utilities from '@utilities';

describe('useLocalState', () => {

    const initialState = {
        keyOne: 'someValue'
    };

    const mockRead = jest.spyOn(utilities, 'localStorageRead');
    mockRead.mockImplementation((_key) => initialState);

    const mockWrite = jest.spyOn(utilities, 'localStorageWrite');
    mockWrite.mockImplementation((_key, _value) => initialState);

    beforeEach(() => {
        window.localStorage.clear();
        jest.clearAllMocks();
    })

    it('takes an initial value and returns value from storage', () => {

        const {result} = renderHook(
            () => useLocalState(initialState),
        );
        
        const [state] = result.current;

        expect(mockRead).toHaveBeenCalledTimes(2);
        waitFor(() => expect(mockWrite).toHaveBeenCalledTimes(1));
        expect(state).toEqual(initialState);
    })
})