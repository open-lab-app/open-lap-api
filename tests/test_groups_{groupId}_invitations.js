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


    t.test('test post /groups/{groupId}/invitations', function (t) {

        var body = {
        };

        var responseSchema = enjoi({
            '$ref': "#/definitions/Invitation"
        }, {
            '#': require('../config/spec.json')
        });


        request(app).post('/v1/groups/1/invitations')
        .expect(200).send(body)
        .end(function (err, res) {
            t.ok(!err, 'post /groups/{groupId}/invitations no error.');
            t.strictEqual(res.statusCode, 200, 'post /groups/{groupId}/invitations 200 status.');
            responseSchema.validate(res.body, function (error) {
                t.ok(!error, 'Response schema valid.');
            });
            t.end();
        });
    });


});
