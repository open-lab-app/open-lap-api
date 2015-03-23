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

    
    t.test('test post /users', function (t) {
        
        var body = {
        };
        
        var responseSchema = enjoi({
            '$ref': "#/definitions/User"
        }, {
            '#': require('../config/spec.yaml')
        });
        

        request(app).post('/v1/users')
        .expect(200).send(body)
        .end(function (err, res) {
            t.ok(!err, 'post /users no error.');
            t.strictEqual(res.statusCode, 200, 'post /users 200 status.');
            responseSchema.validate(res.body, function (error) {
                t.ok(!error, 'Response schema valid.');
            });
            t.end();
        });
    });
    

});
