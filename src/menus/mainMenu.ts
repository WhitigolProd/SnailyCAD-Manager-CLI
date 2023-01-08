import chalk from 'chalk';
import inquirer from 'inquirer';
import startServer from '../utils/startServer.js';
import { isServerOnline } from '../utils/status.js';
import stopServer from '../utils/stopServer.js';
import { appSetup } from './appSetup.js';
import nanospinner from 'nanospinner';

const getList = async () => {
    const spinner = nanospinner.createSpinner('Checking server status...');
    spinner.start();
    if (await isServerOnline()) {
        spinner.success({
            text: `\n${chalk.blueBright('Server Status:')} ${chalk.green(
                'Online'
            )}\n`,
        });
        return [
            {
                name: 'Stop Server',
                value: 'stop',
            },
            {
                name: 'Restart Server',
                value: 'start',
            },
            {
                name: 'Change Port',
                value: 'port',
            },
            {
                name: 'Exit',
                value: 'exit',
            },
        ];
    } else {
        spinner.success({
            text: `\n${chalk.blueBright('Server Status:')} ${chalk.red(
                'Offline'
            )}\n`,
        });
        return [
            {
                name: 'Start Server',
                value: 'start',
            },
            {
                name: 'Change Port',
                value: 'port',
            },
            {
                name: 'Exit',
                value: 'exit',
            },
        ];
    }
};

export const mainMenu = async () => {
    console.log(); // New line
    const list = await getList();
    const menu = await inquirer
        .prompt({
            name: 'menu',
            type: 'list',
            message: 'What would you like to do?',
            choices: list,
        })
        .then(async (answers) => {
            const answer = answers.menu;

            switch (answer) {
                case 'start':
                    console.log('Starting server...');
                    await startServer();
                    break;
                case 'stop':
                    console.log('Stopping server...');
                    await stopServer();
                    break;
                case 'restart':
                    console.log('Restarting server...');
                    break;
                case 'port':
                    console.log('Opening App Setup...');
                    await appSetup();
                    break;
                case 'exit':
                    console.log('Exiting...');
                    process.exit(0);
                    break;
            }
        });
};
