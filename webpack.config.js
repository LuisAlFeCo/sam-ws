
/****************************************************************************************

	Copyright (c) 2018, SAM.
	Author: Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

var path = require('path');
var nodeExternals = require('webpack-node-externals');
var CopyWebpackPlugin = require('copy-webpack-plugin');

/****************************************************************************************/

var serverConfig = {
	node: {
		__filename: true,
		__dirname: false
	},
	target: 'node',
	externals: [nodeExternals()],

	entry: {
		'index.js': './src/index.js',
	},

	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name]'
	},

	module: {
		loaders: [
			{
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},

	plugins: [
		new CopyWebpackPlugin([
			{ from: './src/config.json', to: 'config.json' },
			{ from: './src/api', to: 'api' }
		])
	]
};

/****************************************************************************************/

module.exports = [ serverConfig ];
