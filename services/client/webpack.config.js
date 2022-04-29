const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv").config({ path: "../../.env" });

const development = process.env.NODE_ENV !== "production";

const mode = development ? "development" : "production";

const context = path.resolve(__dirname);

const resolveAppPath = (relPath) => path.resolve(context, relPath);

const entries = () =>
	fs.readdirSync(`${resolveAppPath('src')}/routes`).reduce(
		(chunks, entry) => {
			return chunks; // {...chunks, [entry]: `${resolveAppPath('src')}/routes/${entry}/index.tsx`}
		},
		{
			index: `${resolveAppPath('src')}/index.tsx`,
		}
	);

const appEnvs = Object.keys(dotenv.parsed).reduce((map, key) => {
	if (key.substring(0, 4).toLowerCase() !== "client_") {
		return map;
	}

	return {
		...map,
		[`process.env.${key}`]: JSON.stringify(dotenv.parsed[key]),
	};
}, {});

const devServer = {
	static: resolveAppPath("public"),
	compress: true,
	hot: true,
	port: process.env.CLIENT_PORT,
};

const plugins = [
	new HtmlWebpackPlugin({
		inject: "body",
		template: resolveAppPath("public/index.html"),
	}),
	new webpack.DefinePlugin(appEnvs),
].filter(Boolean);

const config = {
	mode,
	context,
	devtool: development ? "inline-source-map" : "source-map",
	devServer: development ? devServer : undefined,
	entry: { ...entries() },
	output: {
		path: resolveAppPath("dist"),
		filename: "[name].js",
		publicPath: "/",
	},
	resolve: {
		alias: {
			"@": resolveAppPath('src'),
			"@components": resolveAppPath('src/components'),
            "@hooks": resolveAppPath('src/hooks'),
            "@routes": resolveAppPath('src/routes'),
            "@utilities": resolveAppPath('src/utilities')
		},
		extensions: [".ts", ".tsx", ".js", ".jsx"],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: require.resolve("ts-loader"),
					options: {
						context: context,
						configFile: "tsconfig.json",
					},
				},
			},
		],
	},
	plugins,
	watch: () => development,
};

module.exports = config;
