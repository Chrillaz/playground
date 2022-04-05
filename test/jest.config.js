module.exports = {
    globals: {
        "ts-jest": {
            "tsconfig": "<rootDir>/client/tsconfig.json",
        }
    },
    rootDir: "../",
    moduleNameMapper: {
        "@/(.*)$": "<rootDir>/client/$1",
        "@components": "<rootDir>/client/components/index.ts",
        '\\.(css)$': '<rootDir>/test/__mocks__/mui-styles.ts',
    },
    setupFilesAfterEnv: ["<rootDir>/test/setup.js"],
    testEnvironment: "jsdom",
    testMatch: [
        "<rootDir>/client/**/*.(spec|test).+(ts|tsx)"
    ],
    testURL: 'http://localhost:3000',
    transform: {
        ".*\\.(ts|tsx)$": "ts-jest",
    },
    verbose: true,
};