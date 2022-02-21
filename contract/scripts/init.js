// This file does two things:
//
// 1. Compile the AssemblyScript contract using the scripts in package.json
//    (see buildCmd below). This will create a wasm file in the 'build' folder.
// 2. Create a symbolic link (symlink) to the generated wasm file in the root
//    project's `out` folder, for easy use with near-cli.
//
// First, import some helper libraries. `shelljs` is included in the
// devDependencies of the root project, which is why it's available here. It
// makes it easy to use *NIX-style scripting (which works on Linux distros,
// macOS, and Unix systems) on Windows as well.
const sh = require('shelljs');
const path = require('path');

// Figure out which directory the user called this script from, which we'll use
// later to set up the symlink.
const calledFromDir = sh.pwd().toString();

// For the duration of this script, we want to operate from within the
// AssemblyScript project's folder. Let's change into that directory.
sh.cd(__dirname);

// You can call this script with `node compile.js` or `node compile.js --debug`.
// Let's set a variable to track whether `--debug` was used.
const debug = process.argv.pop() === '--debug';

// Use the correct build command based on the `--debug` flag
// const buildCmd = debug
//   ? 'npm run build:debug'
//   : 'npm run build'

// const owner_id = "johnq.testnet";
const owner_id = "proofofattedanceplayground.testnet";

const init = {
  "owner_id": `${owner_id}`, 
  "metadata": { 
    "spec": "SomeSpec", 
    "name": "Proof of Attendance", 
    "symbol":"SomeSymbol", 
    "icon": "SomeIcon", 
    "base_uri": "SomeBaseUri", 
    "reference": "SomeReference", 
    "reference_hash": "SomeReferenceHash" 
  }
}

// const init_command = `
// near call dev-1620252450193-6591749 init '${JSON.stringify(init)}' --accountId=${owner_id}
// `;
// const init_command = `near call dev-1634086167283-66501405407076 init '${JSON.stringify(init)}' --accountId=${owner_id}`
const init_command = `near call proofofattedanceplayground.testnet init '${JSON.stringify(init)}' --accountId=${owner_id}`

// Execute the build command, storing exit code for later use
const { code } = sh.exec(init_command);

process.exit(code);
