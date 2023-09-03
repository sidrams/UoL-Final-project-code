// import fetch from 'node-fetch'
const {fetch} = require('node-fetch')
// import test from '../quranic-ayah-finder/setupTests'
// import 'whatwg-fetch'
const config = {

  testEnvironment: 'jsdom',
  injectGlobals: true,

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Adjust this if needed
    "\\.(css|less)$": "<rootDir>/tests/mocks/styleMock.js", //mock css files 
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tests/mocks/fileMock.js",
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Include .jsx files and use babel-jest transformer
  },
  transformIgnorePatterns: [
    '/node_modules/', // Ignore files in node_modules folder
    '\\.css$', // Ignore CSS files
  ],
  globals: {
    fetch,
  },
  setupFilesAfterEnv: ['../quranic-ayah-finder/setupTests.jsx'],
  // globals: { fetch, Response, Request }
};

module.exports = config;


// module.exports = {

//   testEnvironment: 'jsdom',
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1', // Adjust this if needed
//     "\\.(css|less)$": "<rootDir>/tests/mocks/styleMock.js", //mock css files 
//   },
//   transform: {
//     '^.+\\.jsx?$': 'babel-jest', // Include .jsx files and use babel-jest transformer
//   },
//   transformIgnorePatterns: [
//     '/node_modules/', // Ignore files in node_modules folder
//     '\\.css$', // Ignore CSS files
//   ],
//   globals: {
//     fetch,
//   },
//   // globals: { fetch, Response, Request }
// };
