const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src')
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'src/js/bundle.js',
    path: path.join(__dirname, 'dist')
  },
  devServer: {
    watchFiles: ['src/**/*.hbs'],
    open: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ];
                },
              },
            },
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(jpg|png|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'src/images/[name][ext]'
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['mozjpeg', {
                progressive: true,
                quality: 60
              }],
            ],
          },
        },
      }),
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false
          },
        },
        extractComments: false
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Bootstrap + Sass + Webpack - Inicio',
      bodyClass: 'inicio d-flex justify-content-center w-100 h-100 bg-primary bg-gradient',
      filename: 'index.html',
      template: 'src/views/index.hbs'
    }),
    new HtmlWebpackPlugin({
      title: 'Bootstrap + Sass + Webpack - Contacto',
      bodyClass: 'contacto d-flex justify-content-center w-100 h-100 bg-secondary bg-gradient',
      filename: 'contacto.html',
      template: 'src/views/contacto.hbs'
    }),
    new MiniCssExtractPlugin({
      filename: 'src/css/[name].css'
    }),
  ],
};