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
        api: require('./../config/spec.json'),
        handlers: path.join(__dirname, '../handlers')
    }));


    t.test('test get /users/{userId}', function (t) {

        var responseSchema = enjoi({
            '$ref': "#/definitions/User"
        }, {
            '#': require('../config/spec.json')
        });


        request(app).get('/v1/users/1')
        .expect(200)
        .end(function (err, res) {
            t.ok(!err, 'get /users/{userId} no error.');
            t.strictEqual(res.statusCode, 200, 'get /users/{userId} 200 status.');
            responseSchema.validate(res.body, function (error) {
                t.ok(!error, 'Response schema valid.');
            });
            t.end();
        });
    });

    t.test('test put /users/{userId}', function (t) {

        var body = {
        };


        request(app).put('/v1/users/1')
        .expect(200).send(body)
        .end(function (err, res) {
            t.ok(!err, 'put /users/{userId} no error.');
            t.strictEqual(res.statusCode, 400, 'put /users/{userId} 400 status.');
            t.end();
        });
    });


});
