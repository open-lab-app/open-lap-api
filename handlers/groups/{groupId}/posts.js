'use strict';
/**
 * Operations on /groups/{groupId}/posts
 */
module.exports = {
    /**
     * Gets all posts on a given group. In order to query for posts,
you can provide an offset, and the number of posts to return (defaults to 10).
Posts are returned in chronological order.

     * parameters: groupId, offset, number
     * produces: application/json
     */
    get: function getPosts(req, res) {
        res.send(501);
    },
    /**
     * Adds a new post to the store, requires
the user to have rights to post to the
group

     * parameters: groupId, body
     * produces: application/json
     */
    post: function addPost(req, res) {
        res.send(501);
    }
};