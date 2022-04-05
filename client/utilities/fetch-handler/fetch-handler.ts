import { AxiosResponse } from "axios"

/**
 * 
 * @param promise 
 * @param defaultError 
 * @returns Promise [error, data]
 */
export const fetchHandler = async <T>(
    promise: Promise<AxiosResponse<T>>,
    defaultError: any = 'rejected'
): Promise<T[] | [any, T]> => {

    try {

        const { data } = await promise;

        return [undefined, data];
    } catch (error) {

        return Promise.resolve<[any, T]>([error || defaultError, undefined])
    }
}