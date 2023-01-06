import find from 'find-process';
import { storage } from './storage.js';

export const isServerOnline = async () => {
    const port = await storage('remotePort').read();
    const list = await find('port', port);
    return list.length > 0;
};
