#!/usr/bin/env node
import chalk from 'chalk';
import { loadApp } from './utils/load.js';
import versionCheck from './utils/versionCheck.js';

console.log(chalk.blueBright('Welcome to SnailyCAD Manager'));
console.log(chalk.green('Linux build by Whitigol Web Design'));
await versionCheck();
