const express = require('express');
const router = express.Router();
const app = express();

const mongo = require('mongodb');
const mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.99.100:27017/winder');
var ObjectID = require('mongodb').ObjectID;
let db = mongoose.connection;

let Jumbo = require('../model/jumbo-winder');
let JumboBreaks = require('../model/jumbo-breaks');

//get rewinder_details
router.get('/details', function (req, res) {
    let query = req.query;
    Jumbo.find({}, function (err, result) {
        if (err) {
            console.log('details', err);
            res.json({ status: 400 });
        } else {
            res.json({ status: 200, result: result });
        }
    });
});

//Add Jumbo
router.post('/jumbo', function (req, res) {
    let data = req.body;
    console.log('add jumbo', data.section_2);
    Jumbo.create(data.section_2, function (err, result) {
        if (err) {
            console.log('details', err);
            res.json({ status: 400 });
        } else {
            res.json({ status: 200, result: result });
        }
    });
});

//Add breaks
router.post('/jumbo_breaks', function (req, res) {
    let data = req.body;
    // data.section_2['_id'] = ObjectID;
    // data.section_2['winder_lot_id'] = ObjectID;
    console.log('add jumbo breaks', data);
    JumboBreaks.create(data, function (err, result) {
        if (err) {
            console.log('details', err);
            res.json({ status: 400 });
        } else {
            res.json({ status: 200, result: result });
        }
    });
});

//Breaks details based on Jumbo winder
router.get('/breaks_details/:id', function (req, res) {
    let _id = req.params.id;
    var o_id = new mongo.ObjectID(_id);
    JumboBreaks.find({jumbo_db_id: o_id }, function (err, result) {
        if (err) {
            console.log('error', err);
            res.json({ status: 400 });
        } else {
            res.json({ status: 200, result: result });
        }
    });
});

router.delete('/delete_breaks/:id', function (req, res) {
    let _id = req.params.id;
    var o_id = new mongo.ObjectID(_id);
    console.log('Delete  breaks', o_id);
    JumboBreaks.findByIdAndRemove({_id: o_id }, function (err, result) {
        if (err) {
            console.log('error', err);
            res.json({ status: 400 });
        } else {
            console.log('breaks_details', result);            
            res.json({ status: 200, result: result });
        }
    });
});

module.exports = router;