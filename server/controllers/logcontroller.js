var router = require('express').Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var LogModel = sequelize.import('../models/log');

router.get('/', function(req, res) {
    var userid = req.user.id;

    LogModel 
    .findAll({
        where: { owner: userid}
    })
    .then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});

router.post('/post', function (req, res) {
    var owner = req.user.id;

    LogModel
    .create({
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
        owner: owner
    })
    .then(
        function createSuccess(log) {
            res.json({
                log: log
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

router.get('/:id', function(req, res) {
    var data = req.params.id;
    var userid = req.user.id;

    LogModel
    .findOne({
        where: { id: data, owner: userid}
    }).then(
        function findOneSuccess(data) {
            res.json(data);
        },
        function findOneError(err) {
            res.send(500, err.message);
        }
    );
});

router.delete ('/:id', function(req, res) {
    var data = req.params.id;
    var userid = req.user.id;

    LogModel
    .destroy({
        where: { id: data, owner: userid}
    }).then(
        function deleteLogSuccess(data){
            res.send('you removed a log');
        },
        function deleteLogError(err) {
            res.send(500, err.message);
        }
    );
});

router.put('/:id', function(req, res) {
    var data = req.params.id;
    var log = req.body.log.item;

    LogModel
    .update({
        log: log
    },
    {where: {id: data}}
    ).then(
       function updateSuccess(updatedLog) {
           res.json({
               log: log
           });
       },
       function updateError(err){
           res.send(500, err.message);
       } 
    )
});

module.exports = router;