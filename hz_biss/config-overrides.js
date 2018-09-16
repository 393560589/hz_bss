const { injectBabelPlugin, getLoader } = require('react-app-rewired');

const fileLoaderMatcher = function (rule) {
    return rule.loader && rule.loader.indexOf(`file-loader`) != -1;
}

module.exports = function override(config, env) {
    // babel-plugin-import
    config = injectBabelPlugin(['import', {
        libraryName: 'antd-mobile',
        //style: 'css',
        style: true, // use less for customized theme
    }], config);


    return config;
};