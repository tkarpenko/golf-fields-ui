const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {},
    output: {
        path: __dirname + '/build',
    },
    plugins: [
        new ReplaceInFileWebpackPlugin([{
            dir: 'public',
            files: ['app.json'],
            rules: [{
                search: /"buildTimeStamp": ""/ig,
                replace: `"buildTimeStamp": "${(new Date()).getTime()}"`
            }]
        }]),
    ],
}
