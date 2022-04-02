import { AxiosResponse } from "axios"

export const fetchHandler = <T>(
    promise: Promise<AxiosResponse<T>>,
    defaultError: any = 'rejected'
): Promise<T[] | [any, T]> => {
    return promise
        .then(({ data }) => [undefined, data])
        .catch((error) => Promise.resolve([error || defaultError, undefined]))
}