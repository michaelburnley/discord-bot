const _ = require("lodash");
const fs = require("fs");

const globals = {
	module: false,
	console: false,
	setTimeout: false,
	_: false,
	chalk: false,
	Dream: false,
	Express: false,
	Sequelize: false,
	PORT: false,
	NODE_ENV: false,
	Talk: false,
	OneSignal: false,
	Stripe: false,
	SendGrid: false,
};

const connections = fs.readdirSync("./src/config/connections");
_.each(connections, (file) => {
	const name = file.replace(".js", "");
	globals[name] = false;
});

const models = fs.readdirSync("./src/config/models");
_.each(models, (file) => {
	const name = file.replace(".js", "");
	globals[name] = false;
});

module.exports = {
	extends: [
		"plugin:shopify/esnext",
		"plugin:shopify/node",
		"plugin:shopify/lodash",
	],
	env: {
		node: true,
	},
	rules: {
		"babel/object-curly-spacing": 0,
		"babel/no-invalid-this": 0,
		"import/no-anonymous-default-export": 0,
		"no-alert": 0,
		"no-console": 0,
		"no-new": 0,
		"node/shebang": 0,
		"func-style": 0,
		camelcase: 0,
		"prefer-const": 1,
		"no-const-assign": 1,
		"no-var": 1,
		"no-trailing-spaces": 0,
		"newline-per-chained-call": 0,
		"eol-last": 0,
		radix: 1,
		"no-new-wrappers": 1,
		"no-new-object": 1,
		"object-shorthand": 1,
		"quote-props": 1,
		"id-length": ["error", { exceptions: ["$", "_", "e", "i"] }],
		"lodash/import-scope": 0,
		quotes: [2, "backtick", { avoidEscape: true, allowTemplateLiterals: true }],
		"indent-legacy": ["error", 2, { MemberExpression: 0, SwitchCase: 1 }],
		"lodash/preferred-alias": 0,
	},
	globals: globals,
};
