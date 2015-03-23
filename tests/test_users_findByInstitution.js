'use strict';

var test = require('tape'),
    path = require('path'),
    express = require('express'),
    enjoi = require('enjoi'),
    swaggerize = require('swaggerize-express'),
    request = require('supertest');

test('api', function (t) {
    var app = express();

    

    app.use(swaggerize({
        api: require('./../config/spec.yaml'),
        handlers: path.join(__dirname, '../handlers')
    }));

    
    t.test('test get /users/findByInstitution', function (t) {
        
        var responseSchema = enjoi({
            'type': "array", 
            'items': {"$ref":"#/definitions/User"}
        }, {
            '#': require('../config/spec.yaml')
        });
        

        request(app).get('/v1/users/findByInstitution')
        .expect(200)
        .end(function (err, res) {
            t.ok(!err, 'get /users/findByInstitution no error.');
            t.strictEqual(res.statusCode, 200, 'get /users/findByInstitution 200 status.');
            responseSchema.validate(res.body, function (error) {
                t.ok(!error, 'Response schema valid.');
            });
            t.end();
        });
    });
    

});
