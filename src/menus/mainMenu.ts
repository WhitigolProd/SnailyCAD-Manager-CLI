import inquirer from 'inquirer';
import { isServerOnline } from '../utils/status.js';
import { appSetup } from './appSetup.js';

const getList = async () => {
    if (await isServerOnline()) {
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
                    break;
                case 'stop':
                    console.log('Stopping server...');
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
                    break;
            }
        });
};
