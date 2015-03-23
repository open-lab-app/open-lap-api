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

    
    t.test('test get /users/logout', function (t) {
        

        request(app).get('/v1/users/logout')
        .expect(200)
        .end(function (err, res) {
            t.ok(!err, 'get /users/logout no error.');
            t.strictEqual(res.statusCode, 200, 'get /users/logout 200 status.');
            t.end();
        });
    });
    

});
