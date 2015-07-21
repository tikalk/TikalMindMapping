/**
 * Created by robertferentz on 21/07/15.
 */
var orientDB = require('orientjs');
var Promise = require('bluebird');

var employees = [
    {
        fName: 'Robert',
        lName: 'Ferentz',
        skills: [
            {
                name:'Javascript',
                rank:5
            },
            {
                name:'Python',
                rank:1
            }
        ]
    },
    {
        fName: 'Sefi',
        lName: 'Ninio'
    }

];

function connect(){
    var server = orientDB({
        host: 'localhost',
        port: 2424,
        username: 'root',
        password: 'qwe123'
    });

    return server;
}

function createDB(server){
    return server.create({
        name: 'mindmap',
        type: 'graph',
        storage: 'plocal'
    }).then(function (db) {
        console.log('Created a database called ' + db.name);
        return db;
    });
}

function createMindMapDatabase(server){
    return new Promise(function(resolve, reject){
        server.exists('mindmap').then(function(result){
            if(result){
                server.drop({name:'mindmap'}).then(function(){
                    resolve(createDB(server));
                });

            }
            else{
                resolve(createDB(server));
            }
        });

    });


}

function createEmployees(db){

    var promises = [];
    promises.push(db.class.create('Skill', 'V'));
    promises.push(db.class.create('Skilled', 'E'));
    promises.push(db.class.create('Employee','V'));

    //return db.query('')
    //    .then(function(users){
    //        console.log(users);
    //    });

    return Promise.all(promises).then(function(results){
        var skillClass = results[0],
            employeeClass = results[2];
        employees.forEach(function(emp){
            var skills = emp.skills || [];
            delete emp.skills;
            employeeClass.create(emp).then(function(rEmp){
                skills.forEach(function(skill){
                    skillClass.create({name:skill.name}).then(function(rSkill){
                        db.create('EDGE','Skilled').from(rEmp.RID).to(rSkill.RID).set({
                            rank:skill.rank
                        });
                    });
                });
            });
        });
        console.log('Creation done!');
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