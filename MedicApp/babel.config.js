module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          "@components":
            "./src/components/"
          ,
          "@buttons":
            "./src/components/buttons/"
          ,
          "@containers":
            "./src/components/containers/"
          ,
          "@data":
            "./src/data/"
          ,
          "@models":
            "./src/models/"
          ,
          "@layouts":
            "./src/layouts/"
          ,
          "@services":
            "./src/services/"
        }
      }
    ],
    'jest-hoist'
  ]
};
