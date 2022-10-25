const path = require('path');
const Dotenv = require('dotenv-webpack');
const { HotModuleReplacementPlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const DEV_PLUGINS = [
	new HotModuleReplacementPlugin(),
];
const PROD_PLUGINS = [
	new ImageMinimizerPlugin({
		minimizer: {
			implementation: ImageMinimizerPlugin.imageminMinify,
			options: {
				plugins: [['mozjpeg', { quality: 50 }], 'imagemin-pngquant']
			}
		}
	})
];
const COMMON_PLUGINS = [
	new Dotenv(),
	new CleanWebpackPlugin(),
	new MiniCssExtractPlugin({
		filename: 'client/main.css'
	}),
	new CopyPlugin({
		patterns: [
			{ from: path.resolve(__dirname, 'src/client/assets'), to: path.resolve(__dirname, 'public/client/assets') },
			{ from: path.resolve(__dirname, 'src/server'), to: path.resolve(__dirname, 'public/server') }
		]
	}),
];

module.exports = {
	mode: NODE_ENV,
	devtool: 'eval',
	entry: IS_DEV
		? [ path.resolve(__dirname, './src/client/index.js'), 'webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr&reload=true']
		: path.resolve(__dirname, './src/client/index.js'),
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'client/main.js',
		publicPath: '/',
		hotUpdateChunkFilename: '.hot/hot-update.js',
		hotUpdateMainFilename: '.hot/hot-update.json'
	},
	plugins: IS_DEV ? COMMON_PLUGINS.concat(DEV_PLUGINS) : COMMON_PLUGINS.concat(PROD_PLUGINS),
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/i,
				type: 'asset/resource'
			}
		]
	}
};
