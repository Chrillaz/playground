require('dotenv').config();

module.exports = {
    projects: [
        '<rootDir>/services/api/test/jest.config.js',
        '<rootDir>/services/client/test/jest.config.js',
    ],
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest'
    },
    verbose: true
}