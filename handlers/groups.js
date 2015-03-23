'use strict';
/**
 * Operations on /groups
 */
module.exports = {
    /**
     * Gets `Group` objects.
Optional query param of **size** determines
size of returned array

     * parameters: size
     * produces:
     */
    get: function (req, res) {
        res.send(501);
    },
    /**
     * Allows you to create a new `Group` object

     * parameters: body
     * produces: application/json
     */
    post: function addGroup(req, res) {
        res.send(501);
    },
    /**
     *
     * parameters: body
     * produces: application/json
     */
    put: function updateGroup(req, res) {
        res.send(501);
    }
};