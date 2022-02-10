module.exports = {
    globals: {
        "ts-jest": {
            "tsconfig": "<rootDir>/client/tsconfig.json",
        }
    },
    rootDir: "../",
    moduleNameMapper: {
        "@/(.*)$": "<rootDir>/$1",
        "@client/(.*)$": "<rootDir>/client/$1",
        '\\.(css|less)$': '<rootDir>/test/__mocks__/style-mock.ts',
    },
    setupFilesAfterEnv: ["<rootDir>/test/setup.js"],
    testEnvironment: "jsdom",
    testMatch: ["<rootDir>/client/**/*.test.+(ts|tsx)"],
    transform: {
        ".*\\.(ts|tsx)$": "ts-jest",
    },
    verbose: true,
};