export default {
  transform: {
    ".(ts|tsx)": "ts-jest"
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/lib/"
  ],
  testRegex: "(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "json",
    "svg"
  ],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^.+.(svg)$': 'jest-transform-stub',
    '@calyptia-vivo/components/(.+)': '<rootDir>/src/$1',
  }
}
