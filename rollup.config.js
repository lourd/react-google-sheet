import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

const { BUILD_ENV, BUILD_FORMAT } = process.env

const babelPlugins = [
  'external-helpers'
]

if (BUILD_ENV === 'production') {
  babelPlugins.push([
    'transform-react-remove-prop-types',
    { removeImport: true },
  ])
}

const config = {
  input: 'modules/index.js',
  output: {
    name: 'ReactGoogleSheet',
    globals: {
      react: 'React',
    },
  },
  // by listing no external, everything is external, we just get a warning
  // external: [],
  plugins: [
    babel({
      babelrc: false,
      presets: [
        'react',
        [
          'env',
          {
            loose: true,
            modules: false,
            targets: {
              chrome: '60',
              edge: '15',
              firefox: '57',
              ios: '10.3',
            },
          },
        ],
        'stage-2'
      ],
      plugins: babelPlugins,
      exclude: 'node_modules/**',
    }),
  ],
}

if (BUILD_FORMAT === 'umd') {
  // In the browser build, include our smaller dependencies
  // so users only need to include React
  config.external = ['react']
  config.plugins.push(
    ...[
      resolve(),
      commonjs({
        include: /node_modules/,
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(BUILD_ENV),
      }),
    ],
  )
  if (BUILD_ENV === 'production') {
    config.plugins.push(uglify())
  }
}

export default config