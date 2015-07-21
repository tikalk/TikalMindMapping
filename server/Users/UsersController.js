/**
 * Created by sefi on 21/07/15.
 */
'use strict';

var express = require('express');
var router = express.Router();
var logger = require('log4js').getLogger('UsersController');
var _ = require('lodash');
var request = require('request');
var services = require('../services');

function getAllUsers (req, res) {
    services.db.connect(function(db) {
        db.select().from('Employee').all().then(function(users) {
            res.status(200).send({users:users});
        });
    });
}

function getAllSkills (req, res) {
    services.db.connect(function(db) {
        db.select().from('Skill').all().then(function(skills) {
            res.status(200).send({skills:skills});
        });
    });
}

function getUserSkills (req, res) {
    services.db.connect(function(db) {
        db.query('select from Skilled where out = :rid)',{
            params:{
                rid:services.db.codeId(req.params.userId)
            }
        }).then(function(skillEdges){
            if(skillEdges.length){
                db.query('select name,@rid as id from :ids', {
                        params:{ids:_.pluck(skillEdges,'in')
                    }
                }).then(function(skills){
                    skills = skills || [];
                    var result = skills.map(function(skill){
                        var edge = _.find(skillEdges,{in:skill.id});
                        return {
                            skillID: skill.id,
                            name:skill.name,
                            rank:edge.rank,
                            rating:edge.rating
                        }
                    });
                    res.status(200).send(result);
                });

            }

        });
        //db.select().from('Skilled').where({out:services.db.codeId(req.params.userId)}).
        //    all().
        //    then(function(skills){
        //        res.status(200).send(skills);
        //    });
        //db.select()
    });
}

function getSkillUsers (req, res) {
    res.status(200).send({});
}

router.get('/user/all', getAllUsers);
router.get('/skill/all', getAllSkills);
router.get('/user/skill/:userId', getUserSkills);
router.get('/skill/user/:skillId', getSkillUsers);


module.exports = router;