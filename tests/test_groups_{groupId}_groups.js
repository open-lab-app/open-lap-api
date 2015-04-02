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
        api: require('./../config/spec.json'),
        handlers: path.join(__dirname, '../handlers')
    }));

    
    t.test('test get /groups/{groupId}/groups', function (t) {
        
        var responseSchema = enjoi({
            'title': "ArrayOfGroups", 
            'type': "array", 
            'items': {"$ref":"#/definitions/Group"}
        }, {
            '#': require('../config/spec.json')
        });
        

        request(app).get('/v1/groups/1/groups')
        .expect(200)
        .end(function (err, res) {
            t.ok(!err, 'get /groups/{groupId}/groups no error.');
            t.strictEqual(res.statusCode, 200, 'get /groups/{groupId}/groups 200 status.');
            responseSchema.validate(res.body, function (error) {
                t.ok(!error, 'Response schema valid.');
            });
            t.end();
        });
    });
    

});
