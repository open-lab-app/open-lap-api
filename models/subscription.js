'use strict';

function Subscription(options) {
    if (!options) {
        options = {};
    }

    this.id = options.id;
    this.type = options.type;
    this.email = options.email;
}

module.exports = Subscription;
