var fs = require('fs');
var argv = require('yargs').argv;
var project = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

module.exports = {
    get env() {
        return 'development';
    },
    get dest() {
        return 'dev';
    },
    src: 'src',
    watchOpts: {
        useFsEvents: true
    }
};
