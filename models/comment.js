'use strict';

function Comment(options) {
    if (!options) {
        options = {};
    }

    this.id = options.id;
    this.author = options.author;
    this.postId = options.postId;
}

module.exports = Comment;
