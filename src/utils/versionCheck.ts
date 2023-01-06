import axios from 'axios';
import chalk from 'chalk';
import { spawn } from 'child_process';
import fs from 'fs';
import inquirer from 'inquirer';
import nanospinner from 'nanospinner';
import path from 'path';
import { loadApp } from './load.js';

const versionCheck = async () => {
    const spinner = nanospinner.createSpinner('Checking for updates...');
    spinner.start();
    let response;
    // Set response to the latest version from the GitHub API, but if it fails, return.
    try {
        response = await axios.get(
            'https://raw.githubusercontent.com/whitigolprod/snailycad-manager-linux/main/package.json'
        );
    } catch (error) {
        spinner.warn({
            text: 'Failed to check for updates.',
        });
        console.log(
            chalk.red(
                'Failed to check for updates. Please check your internet connection try later.'
            )
        );
        return;
    }
    spinner.success({
        text: 'Update check complete.',
    });
    const latestVersion = response.data.version;

    // Get the current version from the package.json file
    const packageJson = fs.readFileSync(
        path.join(process.cwd(), '/package.json'),
        'utf8'
    );
    const currentVersion = JSON.parse(packageJson).version;

    if (currentVersion < latestVersion) {
        const update = await inquirer
            .prompt({
                name: 'update',
                message:
                    'There is a new version available. Would you like to update?',
                type: 'confirm',
            })
            .then(async (answers) => {
                const answer = answers.update;
                let spinner = nanospinner.createSpinner('Updating...');
                if (answer) {
                    const update = spawn(
                        'npm i -g snailycad-manager-linux',
                        [],
                        { shell: true }
                    );
                    update.on('spawn', () => {
                        spinner.start();
                    });
                    update.on('close', (code) => {
                        if (code === 0) {
                            spinner.success({
                                text: `Update Complete! ${chalk.yellow(
                                    'Please run the command again to use the new version.'
                                )}`,
                            });
                        } else {
                            spinner.warn({
                                text: `${chalk.red(
                                    'Update Failed!'
                                )} Please try again later, or contact support.`,
                            });
                        }
                        process.exit(0);
                    });
                } else {
                    await loadApp();
                }
            });
    } else {
        await loadApp();
    }
};

export default versionCheck;
