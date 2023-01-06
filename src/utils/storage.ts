import fs from 'fs';
import path from 'path';

const storageClass = class {
    key: string = '';
    constructor(key: string) {
        this.key = key;
    }

    read() {
        const filePath = path.join(process.cwd(), '/data/settings.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))[this.key];
        return data;
    }

    write(value: storageWrite) {
        const filePath = path.join(process.cwd(), '/data/settings.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        data[this.key] = value;
    }
};

export const storage = (key: string) => {
    return new storageClass(key);
};
