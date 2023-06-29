const configBase = require('./jest.config.base');

module.exports = {
  ...configBase,
  projects: ['<rootDir>/packages/*/jest.config.js'],
  testMatch: ['<rootDir>/packages/**/*.(spec|test).{ts,tsx}'],
};
