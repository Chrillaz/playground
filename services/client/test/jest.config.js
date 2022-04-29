require('dotenv').config({ path: '../../.env' });

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
        "@hooks": "<rootDir>/src/hooks/index.ts",
        "@routes/(.*)$": "<rootDir>/src/routes/$1",
        "@utilities": "<rootDir>/src/utilities/index.ts"
    },
    setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/src/**/*.(test|spec).+(ts|tsx)'],
    testURL: 'http://localhost:' + process.env.CLIENT_PORT,
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest'
    }
}