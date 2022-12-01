import * as path from 'path';
import * as url from 'url';
import webpack from 'webpack';
import nodemon from 'nodemon';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.cjs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const hmrServer = express();

const webpackCompiler = webpack(webpackConfig);

nodemon({
	script: path.resolve(__dirname, '../src/server/index.js'),
	watch: [path.resolve(__dirname, '../public')]
});

hmrServer.use(
	webpackDevMiddleware(webpackCompiler, {
		publicPath: webpackConfig.output.publicPath,
		writeToDisk: true,
		stats: 'errors-only'
	})
);

hmrServer.use(
	webpackHotMiddleware(webpackCompiler, {
		path: '/__webpack_hmr'
	})
);

hmrServer.listen(3001, () => {
	console.log('HMR server started');
});
