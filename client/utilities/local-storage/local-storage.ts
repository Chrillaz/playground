export const storageWrite = <T = string>(key: string, value: T): void => {

    if ('localStorage' in window) {

        localStorage.setItem(key, JSON.stringify(value));
    }
}

export const storageRead = <T = any>(key: string): T => {

    if ('localStorage' in window) {

        return JSON.parse(localStorage.getItem(key));
    }
}