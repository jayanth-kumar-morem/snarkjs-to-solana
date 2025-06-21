#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const fs = require('fs');

const parseVkToRust = require('../src/parse_vk_to_rust.js');

program
  .name('snarkjs-to-solana')
  .description('CLI tools for converting snarkjs artifacts to Solana-compatible formats')
  .version('1.0.0');

program
  .command('verification-key-to-rust')
  .description('Convert a snarkjs verification key JSON to a Rust file')
  .argument('<verification-key-path>', 'Path to the verification key JSON file')
  .option('-o, --output <directory>', 'Output directory (defaults to current directory)', '.')
  .action(async (verificationKeyPath, options) => {
    try {
      if (!fs.existsSync(verificationKeyPath)) {
        console.error(`Error: Verification key file not found: ${verificationKeyPath}`);
        process.exit(1);
      }

      const outputDir = path.resolve(options.output);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      console.log(`Converting verification key: ${verificationKeyPath}`);
      console.log(`Output directory: ${outputDir}`);

      await parseVkToRust(verificationKeyPath, outputDir);
      
      console.log(`Generated verifying_key.rs in ${outputDir}`);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse(); 