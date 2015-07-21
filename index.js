/**
 * Created by robertferentz on 21/07/15.
 */
var express = require('express');
var app = express();


app.use(express.static('client'));
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Tikal mind mapping listening at http://%s:%s', host, port);
});