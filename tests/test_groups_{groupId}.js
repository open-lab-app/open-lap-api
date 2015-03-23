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

    app.use(swaggerize({
        api: require('./../config/spec.yaml'),
        handlers: path.join(__dirname, '../handlers')
    }));

    
    t.test('test get /groups/{groupId}', function (t) {
        
        var responseSchema = enjoi({
            '$ref': "#/definitions/Group"
        }, {
            '#': require('../config/spec.yaml')
        });
        

        request(app).get('/v1/groups/1')
        .expect(200)
        .end(function (err, res) {
            t.ok(!err, 'get /groups/{groupId} no error.');
            t.strictEqual(res.statusCode, 200, 'get /groups/{groupId} 200 status.');
            responseSchema.validate(res.body, function (error) {
                t.ok(!error, 'Response schema valid.');
            });
            t.end();
        });
    });
    
    t.test('test put /groups/{groupId}', function (t) {
        
        var body = {
        };
        

        request(app).put('/v1/groups/1')
        .expect(200).send(body)
        .end(function (err, res) {
            t.ok(!err, 'put /groups/{groupId} no error.');
            t.strictEqual(res.statusCode, 400, 'put /groups/{groupId} 400 status.');
            t.end();
        });
    });
    

});
