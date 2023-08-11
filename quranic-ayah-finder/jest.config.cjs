module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Adjust this if needed
    "\\.(css|less)$": "<rootDir>/tests/mocks/styleMock.js", //mock css files 
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Include .jsx files and use babel-jest transformer
  },
  transformIgnorePatterns: [
    '/node_modules/', // Ignore files in node_modules folder
    '\\.css$', // Ignore CSS files
  ],
};

// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'jsdom',
//     moduleNameMapper: {
//       '^@/(.*)$': '<rootDir>/src/$1', // Adjust this if needed
//     },
//     transform: {
//       '^.+\\.(ts|tsx|jsx)$': 'ts-jest', // Include .jsx files in the transform configuration
//     },
//   };
  