const path = require('path');
const { resolve } = require('path');

module.exports = {
  entry: './src/index.js', // Adjust the entry point as needed
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Adjust the output filename as needed
  },
  resolve: {
    fallback: {
      crypto: false,
      stream: false,
      util: false
    },
  },
  target: 'web', // Set the target to 'web' for the web environment
  module: {
    rules: [
      // Add your module rules here for handling JavaScript, CSS, etc.
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Example: Use Babel for JavaScript
        },
      },
    ],
  },
  // Add any plugins or additional configurations as needed
};
