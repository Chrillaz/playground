/**
 * 
 * @param key - string
 * @param value any
 */
 export const localStorageWrite = <T = string>(key: string, value: T): T => {

    if ('Storage' in window) {

        localStorage.setItem(key, JSON.stringify(value));
    }

    return value;
}

/**
 * 
 * @param key - string
 * @returns - any
 */
export const localStorageRead = <T>(key: string): {[key: string]: T} => {

    if ('Storage' in window) {

        return JSON.parse(localStorage.getItem(key));
    }

    return {};
}