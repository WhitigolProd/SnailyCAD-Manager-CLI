import chalk from 'chalk';
import inquirer from 'inquirer';

const wait = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

const menus = {
    main: async () => {
        console.log(chalk.blueBright("Welcome to SnailyCAD Manager for Linux!"))
        console.log(chalk.redBright("This CLI is still in development, so please report any bugs you find!"))
        console.log('Server Status: ' + chalk.greenBright('Online'))

        const menu = await inquirer.prompt({
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: [
                {
                    name: `${chalk.greenBright('▶')} Start Remote Server`,
                    value: "START_SERVER"
                },
                {
                    name: "🛑 Stop Remote Server",
                    value: "STOP_SERVER"
                },
                {
                    name: "🔁 Restart Remote Server",
                    value: "RESTART_SERVER"
                },
                {
                    name: "❌ Close CLI",
                    value: "CLOSE_CLI"
                }
            ]
        }).then(async (answers) => {
            const answer = answers.menu;

            switch (answer) {
                case "VIEW_SERVER_STATUS":
                    console.log("View Server Status");
                    break;
                case "VIEW_SERVER_LOGS":
                    console.log("View Server Logs");
                    break;
                case "START_SERVER":
                    console.log("Start Server");
                    break;
                case "STOP_SERVER":
                    console.log("Stop Server");
                    break;
                case "RESTART_SERVER":
                    console.log("Restart Server");
                    break;
                case "UPDATE_SERVER":
                    console.log("Update Server");
                    break;
                case "CLOSE_CLI":
                    await wait().then(() => {
                        console.log("Closing CLI...");
                    });
                    process.exit(0);
            }
        })
    }
}

export default menus;