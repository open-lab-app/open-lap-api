'use strict';
/**
 * Operations on /users
 */
module.exports = {
    /**
     * This creates a new user. It requires a valid
invitation token, which is generated at the
invitation step

     * parameters: body, invitationId
     * produces: 
     */
    post: function createUser(req, res) {
        res.send(501);
    }
};