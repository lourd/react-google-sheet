const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const resolve = require('rollup-plugin-node-resolve')
const uglify = require('rollup-plugin-uglify')

const env = process.env.BUILD_ENV

const config = {
  input: 'modules/index.js',
  output: {
    name: 'ReactGoogleSheet',
    globals: {
      react: 'React',
    },
  },
  external: ['react'],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [['env', { loose: true, modules: false }], 'stage-2', 'react'],
      plugins: ['external-helpers'].concat(
        env === 'production'
          ? ['dev-expression', 'transform-react-remove-prop-types']
          : [],
      ),
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    commonjs({
      include: /node_modules/,
    }),
  ],
}

if (env === 'production') {
  config.plugins.push(uglify())
}

module.exports = config
