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
const sh = require('shelljs')
const path = require('path')
const random_token_id = require("./random-token-id.json");

// Figure out which directory the user called this script from, which we'll use
// later to set up the symlink.
const calledFromDir = sh.pwd().toString()

// For the duration of this script, we want to operate from within the
// AssemblyScript project's folder. Let's change into that directory.
sh.cd(__dirname)

// You can call this script with `node compile.js` or `node compile.js --debug`.
// Let's set a variable to track whether `--debug` was used.
const debug = process.argv.pop() === '--debug'

// Use the correct build command based on the `--debug` flag
// const buildCmd = debug
//   ? 'npm run build:debug'
//   : 'npm run build'

// this changes everytime we call nft_mint be sure to change after calling command nft_mint
// const token_id = "hf4k0m.token_id";
const token_id = random_token_id.token_id;

const nft_transfer_command = `near call dev-1620252450193-6591749 nft_transfer '{ "receiver_id": "johnqplay.testnet", "token_id": "${token_id}", "approval_id": "0", "memo": "someMemo" }' --accountId=johnq.testnet`

// Execute the build command, storing exit code for later use
const { code } = sh.exec(nft_transfer_command)

process.exit(code)
