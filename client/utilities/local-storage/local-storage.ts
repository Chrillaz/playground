/**
 * 
 * @param key - string
 * @param value any
 */
export const storageWrite = <T = string>(key: string, value: T): void => {

    if ('Storage' in window) {

        localStorage.setItem(key, JSON.stringify(value));
    }
}

/**
 * 
 * @param key - string
 * @returns - any
 */
export const storageRead = <T = any>(key: string): T => {

    if ('Storage' in window) {

        return JSON.parse(localStorage.getItem(key));
    }
}