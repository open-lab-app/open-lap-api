'use strict';

function Login(options) {
    if (!options) {
        options = {};
    }

    this.username = options.username;
    this.password = options.password;
}

module.exports = Login;
