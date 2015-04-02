'use strict';

function DataBundle(options) {
    if (!options) {
        options = {};
    }
    
    this.id = options.id;
    this.postId = options.postId;
    this.cover = options.cover;
    this.files = options.files;
}

module.exports = DataBundle;
