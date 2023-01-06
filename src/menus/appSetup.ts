import chalk from 'chalk';
import inquirer from 'inquirer';
import { loadApp } from '../utils/load.js';
import { storage } from '../utils/storage.js';

export const appSetup = async () => {
    const setup = await inquirer
        .prompt({
            name: 'setup',
            type: 'input',
            message: `Please enter the port you wish to use for the remote server. This port ${chalk.bold(
                'must'
            )} be a 4-5 digit number. If you are unsure, leave this blank and the default port will be used (3050).`,
            default: 3000,
        })
        .then(async (answers) => {
            const answer = answers.setup;
            storage('remotePort').write(answer);
            await loadApp();
        });
};
