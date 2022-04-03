import { storageWrite, storageRead } from '@/utilities';

describe('Reads and writes from localStorage', () => {

    const KEY = 'key';

    const mockSetItem = jest.fn();

    const mockGetItem = jest.fn();

    beforeAll(() => {
        jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
        jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem')

        Object.setPrototypeOf(window.localStorage.setItem, mockSetItem);

        Object.setPrototypeOf(window.localStorage.getItem, mockGetItem);
    })

    beforeEach(() => {
        window.localStorage.clear();
        jest.clearAllMocks();
    })

    it('writes to localStorage', () => {

        storageWrite(KEY, true);

        expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(window.localStorage.setItem).toHaveBeenCalledWith(KEY, 'true');
        expect(window.localStorage.getItem(KEY)).toMatch('true');
    })

    it('reads from localStorage', () => {

        storageWrite(KEY, true);

        const result = storageRead(KEY);

        expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
        expect(window.localStorage.getItem).toHaveBeenCalledWith(KEY);
        expect(result).toEqual(true);
    })
})