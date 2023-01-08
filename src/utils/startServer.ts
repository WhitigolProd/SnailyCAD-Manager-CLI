import path from 'path';
import { spawn } from 'child_process';
import { mainMenu } from '../menus/mainMenu.js';

const startServer = async () => {
    const serverPath = path.join(
        process.cwd(),
        '/dist/remote/server/server.js'
    );

    const server = spawn('node', [serverPath], {
        detached: true,
    });

    server.stdout.on('data', async (chunk: Buffer) => {
        console.log(chunk.toString());

        if (chunk.toString().includes('Server started')) {
            server.unref();
            await mainMenu();
        }
    });
};

export default startServer;
