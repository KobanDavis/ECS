const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const htmlPluginConfig = new HtmlWebPackPlugin({
	template: './src/index.html',
})

const prod = process.env.NODE_ENV === 'production'

module.exports = {
	output: {
		filename: '[name].js',
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader',
			},
			{
				test: /\.(eot|ttf|woff(2*)|svg)$/,
				exclude: [/src\/assets/],
				use: [
					{
						loader: 'file-loader',
						options: { name: 'fonts/[hash]-[name].[ext]' },
					},
				],
			},
			{
				test: /\.css$/,
				use: [prod ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
			},
			{
				test: /\.(jpg|png|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: { name: 'img/[hash]-[name].[ext]' },
					},
				],
				exclude: /node_modules/,
			},
		],
	},
	plugins: [htmlPluginConfig, new MiniCssExtractPlugin({ filename: '[name].css' })],
}
