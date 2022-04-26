require('dotenv').config({ path: '../.env' });

module.exports = {
    rootDir: '../',
    displayName: 'client',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.json'
        }
    },
    moduleNameMapper: {
        "@components": "<rootDir>/src/components/index.ts",
        "@routes/(.*)$": "<rootDir>/src/routes/$1"
    },
    setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/src/**/*.(test|spec).+(ts|tsx)'],
    testURL: 'http://localhost:' + process.env.APP_PORT,
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest'
    }
}