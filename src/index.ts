#!/usr/bin/env node
import chalk from 'chalk';
import { loadApp } from './utils/load.js';
import { storage } from './utils/storage.js';

console.log(chalk.blue('Welcome to SnailyCAD Manager'));
console.log(chalk.green('Linux build by Whitigol Web Design'));
console.log(storage('remotePort').read());
await loadApp();
