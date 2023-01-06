import chalk from 'chalk';
import express from 'express';
import session from 'express-session';
import { keyGen } from '../../utils/keyGen.js';
import { storage } from '../../utils/storage.js';
import { Routes } from './routes/routes.js';
const app = express();

app.set('view engine', 'ejs');
app.set('views', '../client/views');
app.use(
    session({
        secret: keyGen(32),
        resave: false,
        saveUninitialized: false,
    })
);

export const startRemoteServer = async () => {
    const port = await storage('remotePort').read();

    app.listen(3000, () => {
        console.log(`Remote server listening at [::]:${port}`);
        console.log(
            `${chalk.blueBright(
                'NOTE:'
            )} This server is only accessible on your local network until you set up port forwarding, or some sort of reverse proxy.`
        );
    });
};

// Import Routes
app.use('/', Routes.MainRouter);
app.use('/api', Routes.ApiRouter);
app.use('/auth', Routes.AuthRouter);
