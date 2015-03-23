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

    
    t.test('test post /users/login', function (t) {
        
        var body = {
        };
        
        var responseSchema = enjoi({
            'type': "string"
        }, {
            '#': require('../config/spec.yaml')
        });
        

        request(app).post('/v1/users/login')
        .expect(200).send(body)
        .end(function (err, res) {
            t.ok(!err, 'post /users/login no error.');
            t.strictEqual(res.statusCode, 200, 'post /users/login 200 status.');
            responseSchema.validate(res.body, function (error) {
                t.ok(!error, 'Response schema valid.');
            });
            t.end();
        });
    });
    

});
