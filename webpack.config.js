const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'lib');
const APP_DIR = path.resolve(__dirname, 'src');

const WebpackConfig = {
  entry: `${APP_DIR}/index.js`,

  output: {
    path: BUILD_DIR,
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'Tool-Box',
  },

  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /.js$/,
        exclude: /node_modules/,
        include: APP_DIR,
        options: {
          presets: ['env', 'react', 'stage-0'],
        },
      },
      {
        test: /\.css$|\.less$/,
        include: APP_DIR,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
        }),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.css',
    }),
  ],
};


// webpack production config.
if (process.env.NODE_ENV === 'production') {
  WebpackConfig.externals = {
    react: 'react',
    'react-dom': 'react-dom',
  };

  WebpackConfig.plugins = [
    ...WebpackConfig.plugins,
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
      },
      compress: {
        warnings: false,
        screw_ie8: true,
      },
      comments: false,
    }),
  ];
}


module.exports = WebpackConfig;
