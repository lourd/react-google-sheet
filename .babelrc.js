const { BUILDING, BUILD_ENV } = process.env

const config = {
  presets: [
    [
      'env',
      {
        modules: BUILDING ? false : 'commonjs',
        targets: {
          chrome: '60',
          edge: '15',
          firefox: '57',
          ios: '10.3',
        },
      },
    ],
    'stage-2',
    'react',
  ],
  plugins: [],
}

if (BUILDING) {
  config.plugins.push('external-helpers')
}

if (BUILD_ENV === 'production') {
  config.plugins.push([
    'transform-react-remove-prop-types',
    { removeImport: true },
  ])
}

module.exports = config
