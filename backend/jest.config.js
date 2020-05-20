
module.exports = {

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // The coverage must collect from any directory above src 
  // and not from main the folder
  collectCoverageFrom: ['**/src/**/*.js', '!**/src/main/**'],

  // Preset of the Jest MongoDB
  preset: '@shelf/jest-mongodb',

};
