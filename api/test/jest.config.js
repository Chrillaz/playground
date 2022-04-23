module.exports = {
    rootDir: '../',
    displayName: 'api',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.json'
        }
    },
    globalSetup: '<rootDir>/test/migrateDatabases.ts',
    moduleNameMapper: {
        "@controllers/(.*)$": "<rootDir>/src/controllers/$1",
        "@models/(.*)$": "<rootDir>/src/models/$1",
        "@routes/(.*)$": "<rootDir>/src/routes/$1",
    },
    testEnvironment: 'node',
    testMatch: ['<rootDir>/src/**/*.(test|spec).ts'],
    transform: {
        '^.+\\.ts?$': 'ts-jest'
    }
}