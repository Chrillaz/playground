import { httpHandle } from './http-handle';
import { AxiosResponse } from 'axios';

const mockRequest = (): Promise<AxiosResponse> => new Promise((resolve) => {

    setTimeout(() => resolve({ data: true } as AxiosResponse), 1000);
})

test('returns data', async () => {

    const [error, data] = await httpHandle(mockRequest());

    expect(error).toBe(undefined);
    expect(data).toBe(true);
})