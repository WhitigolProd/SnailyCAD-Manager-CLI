import nanospinner from 'nanospinner';
import { appSetup } from '../menus/appSetup.js';
import { mainMenu } from '../menus/mainMenu.js';
import { storage } from './storage.js';
import versionCheck from './versionCheck.js';

export const loadApp = async () => {
    const spinner = nanospinner.createSpinner();
    spinner.start({
        text: 'Loading app settings...',
    });
    const serverPort = storage('remotePort').read();
    if (!serverPort) {
        spinner.warn({
            text: 'No app settings were found. Running setup...',
        });
        await appSetup();
        return;
    }
    spinner.success({
        text: 'App settings found. Loading...',
    });
    await mainMenu();
};
