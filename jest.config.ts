// jest.config.ts
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  collectCoverage: true,
  coverageReporters: ["json", "html", "cobertura"],
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        suiteNameTemplate: "{filepath}",
        outputDirectory: "./",
        outputName: "junit.xml",
      },
    ],
  ],
  roots: ["<rootDir>/src/"],
  moduleFileExtensions: ["ts", "tsx", "js", "css", "json"],
  transform: {
    "\\.(ts|tsx)$": "ts-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!react|moment)"],
  testPathIgnorePatterns: ["\\.snap$", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/scripts/jest/setupTests.ts"],
  moduleDirectories: ["node_modules", "<rootDir>/node_modules"],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
  globals: {
    "ts-jest": {
      diagnostics: false,
      isolatedModules: false,
    },
  },
};
export default config;
