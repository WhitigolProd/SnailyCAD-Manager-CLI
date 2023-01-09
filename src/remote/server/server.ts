// Imports
import chalk from 'chalk';
import express from 'express';
import session from 'express-session';
import { keyGen } from '../../utils/keyGen.js';
import { storage } from '../../utils/storage.js';
import { Routes } from './routes/routes.js';
import path from 'path';

// App
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), '/src/remote/client/views'));
app.use(
    session({
        secret: keyGen(32),
        resave: false,
        saveUninitialized: false,
    })
);
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(
    '/ace',
    express.static(
        path.join(process.cwd(), '/node_modules/ace-builds/src-min-noconflict')
    )
);
app.use(
    '/styles',
    express.static(path.join(process.cwd(), '/dist/remote/client/styles'))
);

app.use(
    '/scripts',
    express.static(path.join(process.cwd(), '/dist/remote/client/scripts'))
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
