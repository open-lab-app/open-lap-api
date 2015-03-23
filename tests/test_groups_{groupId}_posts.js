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

    
    t.test('test get /groups/{groupId}/posts', function (t) {
        
        var responseSchema = enjoi({
            'type': "array", 
            'items': {"$ref":"#/definitions/Post"}
        }, {
            '#': require('../config/spec.yaml')
        });
        

        request(app).get('/v1/groups/1/posts')
        .expect(200)
        .end(function (err, res) {
            t.ok(!err, 'get /groups/{groupId}/posts no error.');
            t.strictEqual(res.statusCode, 200, 'get /groups/{groupId}/posts 200 status.');
            responseSchema.validate(res.body, function (error) {
                t.ok(!error, 'Response schema valid.');
            });
            t.end();
        });
    });
    
    t.test('test post /groups/{groupId}/posts', function (t) {
        
        var body = {
        };
        

        request(app).post('/v1/groups/1/posts')
        .expect(200).send(body)
        .end(function (err, res) {
            t.ok(!err, 'post /groups/{groupId}/posts no error.');
            t.strictEqual(res.statusCode, 405, 'post /groups/{groupId}/posts 405 status.');
            t.end();
        });
    });
    

});
