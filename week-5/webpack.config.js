const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: process.env.NODE_ENV || "development",
	entry: [path.resolve(__dirname, "./src/App.ts")],
	output: {
		clean: true,
		path: path.resolve(__dirname, "./dist"),
		filename: "main.js",
	},
	module: {
		rules: [
			{ test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ },
			{ test: /\.css$/, use: ["style-loader", "css-loader"] },
			{
				test: /shape\.png$/,
				use: { loader: "file-loader" },
			},
		],
	},
	resolve: {
		extensions: [".ts"],
	},
	plugins: [new HtmlWebpackPlugin({ template: "index.html" })],
};
