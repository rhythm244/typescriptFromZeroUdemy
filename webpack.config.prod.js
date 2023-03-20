const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  //   devtool: "inline-source-map",
//   devtool: "none",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};

// 1) Add a devServer option

// devServer: {
//   static: [
//     {
//       directory: path.join(__dirname),
//     },
//   ],
// },
// 2) Set output.publicPath to '/dist/'

// output: {
//   filename: 'bundle.js',
//   path: path.resolve(__dirname, 'dist'),
//   publicPath: '/dist/'
// },
// (we add publicPath in the next lecture - make sure you set it to '/dist/', NOT to just 'dist'!)

// After the next lecture, the finished, updated webpack.config.js file should look like this:

// const path = require('path');

// module.exports = {
//   mode: 'development',
//   entry: './src/app.ts',
//   devServer: {
//     static: [
//       {
//         directory: path.join(__dirname),
//       },
//     ],
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//     publicPath: '/dist/',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         exclude: /node_modules/,
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.ts', '.js'],
//   },
// };
