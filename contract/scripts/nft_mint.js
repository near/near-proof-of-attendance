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
const fs = require('fs');
const utils = require('./utils');

const { writeFileSync } = utils;

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

// Create random-token-id.json file
const random_string = Math.random().toString(36).substring(7);
const random_token_id = random_string + ".token_id";
let fileObject= {};
fileObject["token_id"] = random_token_id;
fileObject = JSON.stringify(fileObject);
writeFileSync("./random-token-id.json", fileObject);

// Set Deposit amount 
const deposit_amount = 1;
// Set Gas amount
const gas = 100000000000000
// const gas = 200000000000000
// const gas = 100000000000000

const nft_token = {
  "owner_id": "johnq.testnet", 
  "token_id": `${random_token_id}`, 
  "metadata": { 
    "title": "SomeNFTTitle", 
    "description": "SomeNFTDesci", 
    "media": "https://ipfs.fleek.co/ipfs/bafybeiacydivfg63rxg7idoe6xamjcvwaf4ob47kii2sgxn5hkh2pupjga",  
    "media_hash": "what is media_hash?", 
    "copies": "3", 
    "issued_at": "05/28/2021", 
    "expires_at": "05/28/2031", 
    "starts_at": "05/28/2021", 
    "updated_at": "what is updated_at?", 
    "extra": "SomeNFTExtra", 
    "reference": "SomeNFTReference", 
    "reference_hash": "SomeNFTReferenceHash" 
  }
}

const contract = "proofofattedanceplayground.testnet"

// const nft_mint_command = `near call dev-1620252450193-6591749 nft_mint '${JSON.stringify(nft_token)}' --accountId=johnq.testnet --amount=${deposit_amount}`;
// const nft_mint_command = `near call dev-1634086167283-66501405407076 nft_mint '${JSON.stringify(nft_token)}' --accountId=proofofattedanceplayground.testnet --amount=${deposit_amount}`;
const nft_mint_command = `near call ${contract} nft_mint '${JSON.stringify(nft_token)}' --accountId=proofofattedanceplayground.testnet --amount=${deposit_amount} --gas=${gas}`;
// Execute the build command, storing exit code for later use
const { code } = sh.exec(nft_mint_command);

process.exit(code);
