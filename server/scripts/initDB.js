/**
 * Created by robertferentz on 21/07/15.
 */
var orientDB = require('orientjs');

function connect(){
    var server = orientDB({
        host: 'localhost',
        port: 2424,
        username: 'root',
        password: 'qwe123'
    });

    return server;
}

function createMindMapDatabase(server){
    return server.create({
        name: 'mindmap',
        type: 'graph',
        storage: 'plocal'
    }).then(function (db) {
        console.log('Created a database called ' + db.name);
        return db;
    });
}

function createEmployees(db){

    var promises = [];
    promises.push(db.class.create('Employee','V'));
    promises.push(db.class.create('Skill', 'V'));
    promises.push(db.class.create('Skilled', 'E'));
    return db.query('')
        .then(function(users){
            console.log(users);
        });
}

function run(){
    var server = connect();
    //server.list().then(function(list){
    //   console.log(list);
    //});
    createMindMapDatabase(server)
        .then(createEmployees);
}

run();