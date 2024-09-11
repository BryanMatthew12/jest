module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1' // Map @ to src directory
    },
    transform: {
      '^.+\\.vue$': 'vue-jest',
      '^.+\\.js$': 'babel-jest'
    },
    transformIgnorePatterns: [
      '/node_modules/'
    ],
    testEnvironment: 'jsdom'
};
