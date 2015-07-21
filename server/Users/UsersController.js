/**
 * Created by sefi on 21/07/15.
 */
'use strict';

var express = require('express');
var router = express.Router();
var logger = require('log4js').getLogger('UsersController');
var _ = require('lodash');
var request = require('request');

function getUsers (req, res) {

}

router.get('/user/getUsers', getUsers);
