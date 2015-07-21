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
    res.status(200).send({});
}

function getSkillUsers (req, res) {
    res.status(200).send({});
}

router.get('/user/all', getAllUsers);
router.get('/skill/all', getAllSkills);
router.get('/user/skill/:userId', getUserSkills);
router.get('/skill/user/:skillId', getSkillUsers);


module.exports = router;