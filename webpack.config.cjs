const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { NODE_ENV } = process.env;
const IS_DEV = NODE_ENV === 'development';
const DEV_PLUGINS = [new HotModuleReplacementPlugin()];
const PROD_PLUGINS = [
	new ImageMinimizerPlugin({
		minimizer: {
			implementation: ImageMinimizerPlugin.imageminMinify,
			options: {
				plugins: [['mozjpeg', { quality: 50 }],  'imagemin-svgo']
			}
		}
	})
];
const COMMON_PLUGINS = [
	new CleanWebpackPlugin(),
	new HtmlWebpackPlugin({
		template: path.join(__dirname, 'src/client/index.html'),
		filename: 'index.html'
	}),
	new MiniCssExtractPlugin({
		filename: 'client/css/main.css'
	}),
	new CopyPlugin({
		patterns: [{ from: path.resolve(__dirname, 'src/server'), to: path.resolve(__dirname, 'public/server') }]
	})
];

module.exports = {
	mode: NODE_ENV,
	devtool: 'eval',
	entry: IS_DEV
		? [
				path.resolve(__dirname, './src/client/js/index.js'),
				'webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr&reload=true'
		  ]
		: path.resolve(__dirname, './src/client/js/index.js'),
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'client/js/main.js',
		publicPath: '/',
		hotUpdateChunkFilename: '.hot/hot-update.js',
		hotUpdateMainFilename: '.hot/hot-update.json',
		assetModuleFilename: 'client/assets/images/[name][ext]'
	},
	plugins: IS_DEV ? COMMON_PLUGINS.concat(DEV_PLUGINS) : COMMON_PLUGINS.concat(PROD_PLUGINS),
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			},
			{
				test: /\.(svg|png|jpg|jpeg)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.(woff|woff2)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'client/assets/fonts/[name][ext]'
				}
			}
		]
	}
};
