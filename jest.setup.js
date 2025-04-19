// jest.setup.js
require('@testing-library/jest-dom'); // ✅ CommonJS

module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
};
