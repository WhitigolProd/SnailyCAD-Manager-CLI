import killPort from 'kill-port';
import { mainMenu } from '../menus/mainMenu.js';
import { storage } from './storage.js';
const stopServer = async () => {
    const port = storage('remotePort').read();
    if (!port) {
        console.log('No port found');
        return;
    }
    await killPort(Number(port)).then(async (result) => {
        if (result) {
            console.log(`Port ${port} has been killed`);
        } else {
            console.log(
                `Server not found on port ${port}. Server may already be stopped.`
            );
        }

        await mainMenu();
    });
};

export default stopServer;
