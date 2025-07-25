const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const config = {
  resolver: {
    blockList: exclusionList([
      /node_modules\/react-native\/.*\/ReactNativePublic\.js/,
    ]),
    assetExts: ['bin', 'txt', 'xml', 'db', 'mp4', 'png', 'jpg', 'ttf', 'otf'],
    sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
