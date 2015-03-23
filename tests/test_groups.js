'use strict';

var test = require('tape'),
    path = require('path'),
    express = require('express'),
    enjoi = require('enjoi'),
    swaggerize = require('swaggerize-express'),
    request = require('supertest');

test('api', function (t) {
    var app = express();

    
    app.use(require('body-parser')());
    app.use(require('body-parser')());

    app.use(swaggerize({
        api: require('./../config/spec.json'),
        handlers: path.join(__dirname, '../handlers')
    }));

    
    t.test('test get /groups', function (t) {
        
        var responseSchema = enjoi({
            'title': "ArrayOfGroups", 
            'type': "array", 
            'items': {"$ref":"#/definitions/Group"}
        }, {
            '#': require('../config/spec.json')
        });
        

        request(app).get('/v1/groups')
        .expect(200)
        .end(function (err, res) {
            t.ok(!err, 'get /groups no error.');
            t.strictEqual(res.statusCode, 200, 'get /groups 200 status.');
            responseSchema.validate(res.body, function (error) {
                t.ok(!error, 'Response schema valid.');
            });
            t.end();
        });
    });
    
    t.test('test post /groups', function (t) {
        
        var body = {
        };
        

        request(app).post('/v1/groups')
        .expect(200).send(body)
        .end(function (err, res) {
            t.ok(!err, 'post /groups no error.');
            t.strictEqual(res.statusCode, 405, 'post /groups 405 status.');
            t.end();
        });
    });
    
    t.test('test put /groups', function (t) {
        
        var body = {
        };
        

        request(app).put('/v1/groups')
        .expect(200).send(body)
        .end(function (err, res) {
            t.ok(!err, 'put /groups no error.');
            t.strictEqual(res.statusCode, 400, 'put /groups 400 status.');
            t.end();
        });
    });
    

});
