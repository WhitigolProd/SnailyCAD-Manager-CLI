#!/usr/bin/env node
import chalk from 'chalk';
import { loadApp } from './utils/load.js';
import versionCheck from './utils/versionCheck.js';

console.log(chalk.blueBright('Welcome to SnailyCAD Manager'));
console.log(chalk.green('Linux build by Whitigol Web Design'));
console.log(`\n${chalk.redBright('Disclaimer:')} ${chalk.yellow(`This application ${chalk.bold('DOES NOT')} check for requirements. This application assumes you have the following requirements installed:`)}`);
console.log(chalk.yellowBright('NodeJS, NPM, Yarn, Git, and PostgreSQL\n'));
await versionCheck();
