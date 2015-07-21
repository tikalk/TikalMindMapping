/**
 * Created by robertferentz on 21/07/15.
 */
var orientDB = require('orientjs');
var Promise = require('bluebird');
var parseUsers = require('./parseUsers');
var _ = require('lodash');
var employees = parseUsers.parseUsers();
var conf = require('../conf/dev/conf');

function connect(){
    var server = orientDB(conf.dbConf);

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

function parseSkills(oSkills){
    var skills = [];

    Object.keys(oSkills).forEach(function(key){
        var subSet = oSkills[key];
        Object.keys(subSet).forEach(function(subKey){
            skills.push({
                name: subKey,
                rating: parseInt(subSet[subKey],10),
                rank: key.replace('_skills','')
            })
        });
    });

    return skills;
}

function getAllSkills(){

    var arr = _.flatten(employees.map(function(emp){
        return parseSkills(emp.skills || {});
    }));

    return _.unique(_.pluck(arr,'name'));
}

function createAllSkills(skillClass){
    var allSkills = getAllSkills();
    return Promise.all(allSkills.map(function(skillName){
        return skillClass.create({name:skillName}).then(function(nrSkill){
            console.log('Created new Skill: %s', nrSkill.name);
            return nrSkill;
        });
    }));
    //return new Promise(function(resolve){
    //    db.select().from('Skill').where({name:skill.name}).one()
    //        .then(function(rSkill){
    //            if(rSkill){
    //                resolve(rSkill);
    //            }
    //            else{
    //
    //            }
    //        });
    //
    //});
}

function createEmployee(db, employeeClass, allSkills, emp){
    var skills = parseSkills(emp.skills || {});
    delete emp.skills;
    return employeeClass.create(emp).then(function(rEmp){
        console.log('Created Employee: %s %s', rEmp.first_name, rEmp.last_name);
        skills.forEach(function(skill){
            var rSkill = _.find(allSkills,{name:skill.name});

            db.create('EDGE','Skilled').from(rEmp['@rid'].toString()).to(rSkill['@rid'].toString()).set({
                rating:skill.rating,
                rank: skill.rank
            }).one().then(function(edge){
                console.log('Created Skilled Edge from %s to %s', rEmp['@rid'],rSkill['@rid']);
            }).catch(function(err){
                console.log(err);
            });

        });
        return rEmp;
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
        createAllSkills(skillClass).then(function(allSkills){
            var ePromises = employees.map(function(emp){
                return createEmployee(db, employeeClass,allSkills,emp);
            });
            return Promise.all(ePromises).then(function(){
                console.log('Creation done!');
            })
        });


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