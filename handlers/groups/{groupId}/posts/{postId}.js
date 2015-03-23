'use strict';
/**
 * Operations on /groups/{groupId}/posts/{postId}
 */
module.exports = {
    /**
     * Gets a post given an ID, provided the user
has read rights to the group the post belongs to

     * parameters: groupId, postId
     * produces: application/json
     */
    get: function getPostById(req, res) {
        res.send(501);
    },
    /**
     * Allows updating a post by passing the
id as part of the path

     * parameters: groupId, postId, body
     * produces: application/json
     */
    put: function updatePostById(req, res) {
        res.send(501);
    },
    /**
     * If given an id of a valid post that the user
has write rights to, it will be deleted from the
store

     * parameters: groupId, postId
     * produces: 
     */
    delete: function deletePostById(req, res) {
        res.send(501);
    }
};