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

const port = storage('remotePort').read();

app.listen(port, () => {
    console.log(chalk.greenBright(`Server started on port ${port}!`));
    console.log(
        `${chalk.yellowBright(
            'WARNING:'
        )} This server is not accessible from the internet unless you have port forwarding, or a reverse proxy set up.`
    );
});

// Import Routes
app.use('/', Routes.MainRouter);
app.use('/api', Routes.ApiRouter);
app.use('/auth', Routes.AuthRouter);
