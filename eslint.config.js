// @ts-check

import tseslint from 'typescript-eslint'

export default tseslint.config(
	...tseslint.configs.strict,
	...tseslint.configs.stylistic
)

const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')

module.exports = [
	// Any other config imports go at the top
	eslintPluginPrettierRecommended,
]
