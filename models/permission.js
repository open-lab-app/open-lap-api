'use strict';

function Permission(options) {
    if (!options) {
        options = {};
    }

    this.id = options.id;
    this.actionToken = options.actionToken;
    this.groupId = options.groupId;
}

module.exports = Permission;
