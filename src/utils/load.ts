import fs from 'fs';
import nanospinner from 'nanospinner';
import path from 'path';
import { mainMenu } from '../menus/mainMenu.js';

export const loadApp = async () => {
    const spinner = nanospinner.createSpinner();
    spinner.start();
    const settingsStatus = fs.existsSync(
        path.join(process.cwd(), '/data/settings.json')
    );
    if (!settingsStatus) {
        spinner.error({
            text: 'No app settings were found. Running setup...',
        });
        return;
    }
    spinner.success({
        text: 'App settings found. Loading...',
    });
    mainMenu();
};
