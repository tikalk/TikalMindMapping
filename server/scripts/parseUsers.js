/**
 * Created by sefi on 21/07/15.
 */
var fse = require('fs-extra');
var yaml = require('js-yaml');
var _ = require('lodash');


exports.parseUsers = function() {
    try {
        var users = [];
        var dirPrefix = '../../data/users';
        var files = fse.readdirSync(dirPrefix);
        var doc;

        _.each(files, function(file) {
            doc = yaml.safeLoad(fse.readFileSync(dirPrefix + '/' + file, 'utf8'));
            users.push(doc);
        });

        return users;

    } catch (e) {
        console.log(e);
    }
};
