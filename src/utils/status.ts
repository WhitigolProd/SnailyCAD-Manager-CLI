import find from 'find-process';
import { storage } from './storage.js';

export const isServerOnline = async () => {
    const port = storage('remotePort').read();
    if (!port) return false;
    const list = await find('port', port);
    return list.length > 0;
};
