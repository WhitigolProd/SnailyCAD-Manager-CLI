import chalk from 'chalk';
import express from 'express';
import { storage } from '../../utils/storage.js';
const app = express();

app.set('view engine', 'ejs');
app.set('views', '../client/views');

export const startRemoteServer = async () => {
    const port = await storage('remotePort').read();

    app.listen(port, () => {
        console.log(`Remote server listening at [::]:${port}`);
        console.log(
            `${chalk.blue(
                'NOTE:'
            )} This server is only accessible on your local network until you set up port forwarding, or some sort of reverse proxy.`
        );
    });
};

// Import Routes
app.use('/', require('./routes/main.js'));
