'use strict';

function User(options) {
    if (!options) {
        options = {};
    }
    
    this.id = options.id;
    this.username = options.username;
    this.profilePicURL = options.profilePicURL;
    this.firstName = options.firstName;
    this.lastName = options.lastName;
    this.email = options.email;
    this.password = options.password;
    this.organisation = options.organisation;
    this.location = options.location;
    this.permissions = options.permissions;
    this.groups = options.groups;
    this.subscriptions = options.subscriptions;
}

module.exports = User;
