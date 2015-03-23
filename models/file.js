'use strict';

function File(options) {
    if (!options) {
        options = {};
    }
    
    this.id = options.id;
    this.previewPicURL = options.previewPicURL;
    this.fileSourceURL = options.fileSourceURL;
}

module.exports = File;
