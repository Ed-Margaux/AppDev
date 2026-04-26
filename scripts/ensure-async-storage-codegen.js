#!/usr/bin/env node
/**
 * Ensures @react-native-async-storage/async-storage codegen artifacts exist.
 * Run before `npm run android` to avoid "schema.json doesn't exist" after clean.
 */
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const schemaPath = path.join(
  __dirname,
  '..',
  'node_modules',
  '@react-native-async-storage',
  'async-storage',
  'android',
  'build',
  'generated',
  'source',
  'codegen',
  'schema.json'
);

if (fs.existsSync(schemaPath)) {
  process.exit(0);
}

const asyncStoragePath = path.join(__dirname, '..', 'node_modules', '@react-native-async-storage', 'async-storage');
const outputPath = path.join(asyncStoragePath, 'android', 'build', 'generated', 'source', 'codegen');

console.log('Generating AsyncStorage codegen (schema.json was missing)...');
execSync(
  `npx @react-native-community/cli codegen --path "${asyncStoragePath}" --platform android --outputPath "${outputPath}"`,
  { stdio: 'inherit', cwd: path.join(__dirname, '..') }
);
