const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const apps = ['wallet-app', 'host-app'];
const appPaths = apps.map(app => path.join(__dirname, app));

// Function to find npm executable
function findNpm() {
    const npmCommands = [
        path.join(process.env.APPDATA, 'npm/npm.cmd'),
        path.join(process.env.ProgramFiles, 'nodejs/npm.cmd'),
        path.join(process.env['ProgramFiles(x86)'], 'nodejs/npm.cmd'),
        'npm',
    ];

    for (const cmd of npmCommands) {
        if (fs.existsSync(cmd)) {
            return cmd;
        }
    }

    throw new Error('Could not find npm. Please ensure Node.js is installed correctly.');
}

const npmPath = findNpm();

function runCommand(command, args, cwd) {
    return new Promise((resolve, reject) => {
        const process = spawn(command, args, { 
            cwd, 
            stdio: 'inherit', 
            shell: true,
            windowsVerbatimArguments: true 
        });
        process.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Command failed with exit code ${code}`));
            } else {
                resolve();
            }
        });
    });
}

async function installDependencies() {
    for (const appPath of appPaths) {
        console.log(`Installing dependencies for ${path.basename(appPath)}...`);
        await runCommand(npmPath, ['install'], appPath);
    }
}

async function startWalletApp() {
    const walletPath = appPaths[0];
    console.log('Building wallet-app...');
    await runCommand(npmPath, ['run', 'build'], walletPath);
    console.log('Starting wallet-app preview...');
    return runCommand(npmPath, ['run', 'preview', '--', '--port', '5001'], walletPath);
}

async function startHostApp() {
    const hostPath = appPaths[1];
    console.log('Starting host-app...');
    return runCommand(npmPath, ['run', 'dev'], hostPath);
}

async function start() {
    try {
        await installDependencies();
        const walletProcess = startWalletApp();
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
        const hostProcess = startHostApp();
        
        await Promise.all([walletProcess, hostProcess]);
    } catch (error) {
        console.error('An error occurred:', error);
        process.exit(1);
    }
}

start();