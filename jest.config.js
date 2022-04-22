require('dotenv').config();

module.exports = {
    projects: [
        '<rootDir>/api/test/jest.config.js',
        '<rootDir>/client/test/jest.config.js',
    ],
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest'
    },
    verbose: true
}