'use strict';

function Group(options) {
    if (!options) {
        options = {};
    }

    this.id = options.id;
    this.name = options.name;
    this.description = options.description;
    this.groupPicURL = options.groupPicURL;
    this.members = options.members;
    this.parentGroupId = options.parentGroupId;
}

module.exports = Group;
