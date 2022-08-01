const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

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
                search: /"buildTimeStamp": "\d*"/ig,
                replace: `"buildTimeStamp": "${(new Date()).getTime()}"`
            }]
        }]),
    ],
}
