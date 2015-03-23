'use strict';

function Invitation(options) {
    if (!options) {
        options = {};
    }

    this.id = options.id;
    this.creatorId = options.creatorId;
    this.recipientEmail = options.recipientEmail;
    this.accepted = options.accepted;
}

module.exports = Invitation;
