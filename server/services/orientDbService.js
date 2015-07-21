/**
 * Created by sefi on 21/07/15.
 */
'use strict';

var orientDB = require('orientjs');
var conf = require('../conf/dev/conf');

exports.connect = function (callback){
    var server = orientDB(conf.dbConf);

    callback(server.use('mindmap'));
};
