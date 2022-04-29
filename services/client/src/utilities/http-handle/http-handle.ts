import axios, { AxiosResponse } from "axios"

interface IOptions {
    errorMessage?: string;
    alive?: boolean;
}

/**
 * 
 * @param request Promise<AxiosResponse<T>>
 * @param options IOptions 
 * @returns Promise [error, data]
 */
export const httpHandle = async <T>(
    request: Promise<AxiosResponse<T>>,
    options?: IOptions
): Promise<T[] | [any, T]> => {

    try {

        if (options && !options.alive) {

            throw new axios.Cancel('Canceled on unmounted component.');
        }

        const { data } = await request;

        return [undefined, data];
    } catch (error) {

        const errorMessage = options?.errorMessage || 'rejected';

        return Promise.resolve<[any, T]>([error || errorMessage, undefined])
    }
}