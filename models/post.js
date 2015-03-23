'use strict';

function Post(options) {
    if (!options) {
        options = {};
    }

    this.id = options.id;
    this.author = options.author;
    this.dataBundle = options.dataBundle;
    this.title = options.title;
    this.body = options.body;
    this.tags = options.tags;
    this.parentPostId = options.parentPostId;
    this.comments = options.comments;
}

module.exports = Post;
