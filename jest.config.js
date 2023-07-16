const { defaults } = require("jest-config");

module.exports = {
  bail: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  moduleNameMapper: { "^axios$": "axios/dist/node/axios.cjs" },
  roots: ["src"],
  testMatch: ["<rootDir>/src/**/?(*.)test.{ts,tsx}"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  verbose: true,
};
