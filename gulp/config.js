var fs = require('fs');
var argv = require('yargs').argv;
var project = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

module.exports = {
    get env() {
        var env = process.env.NODE_ENV;

        if (argv.production) {
            env = 'production';
        } else if (argv.development) {
            env = 'development';
        }

        return env;
    },
    get dest() {
        return (this.env === 'development' ? 'dev' : 'dist');
    },
    src: 'src',
    watchOpts: {
        useFsEvents: true
    }
};
