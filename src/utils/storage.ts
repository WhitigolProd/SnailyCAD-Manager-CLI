import fs from 'fs';
import { LocalStorage } from 'node-localstorage';
import path from 'path';
LocalStorage;
export const localStorage = new LocalStorage(path.join(process.cwd(), '/data'));

const storageClass = class {
    key: string = '';
    constructor(key: string) {
        this.key = key;
    }

    read() {
        return localStorage.getItem(this.key);
    }

    write(value: string) {
        return localStorage.setItem(this.key, value);
    }
};

export const storage = (key: string) => {
    return new storageClass(key);
};
