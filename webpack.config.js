const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: {
    app: './src/app.js',
    index: './src/pages/index/index.js',
    contact: './src/pages/contact/contact.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'assets/js/[name].[hash:8].js'
  },
  devServer: {
    contentBase: './dist'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        }
      }
    },
    minimizer: [
      new TerserJSPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new OptimizeCSSAssetsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          }, {
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './postcss.config.js'
              }
            }
          }
        ]
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            config: {
              path: './postcss.config.js'
            }
          }
        }, {
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts/'
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      minify: {
        collapseWhitespace: true
      },
      filename: 'index.html',
      template: './src/pages/index/index.html',
      chunks: ['app','index']
    }),
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      minify: {
        collapseWhitespace: true
      },
      filename: 'contacto.html',
      template: './src/pages/contact/contact.html',
      chunks: ['app','contact']
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[hash:8].css'
    })
  ]
}