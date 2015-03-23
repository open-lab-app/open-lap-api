# open-lab-api

```json
{
  "swagger": "2.0",
  "info": {
    "version": "0.0.1",
    "title": "Openlab API",
    "description": "This is the OpenLab API\n",
    "termsOfService": "http://open-lab.io/terms/",
    "contact": {
      "name": "apiteam@open-lab.io"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    }
  },
  "host": "api.open-lab.io",
  "basePath": "/v1",
  "schemes": [
    "http",
    "https"
  ],
  "security": [
    {
      "openLabImplicit": [
        "user",
        "user:email",
        "read:post",
        "write:post",
        "comment:post",
        "read:group",
        "post:group",
        "admin:group"
      ]
    }
  ],
  "securityDefinitions": {
    "openLabImplicit": {
      "type": "oauth2",
      "authorizationUrl": "http://api.open-lab.io/api/oauth/dialog",
      "flow": "implicit",
      "scopes": {
        "user": "Grants read/write access to profile info, includes user:email",
        "user:email": "Grants read access to a user's email addresses.",
        "read:post": "Grants read access to a post",
        "write:post": "Grants write access to a post, allowing to change the contents",
        "comment:post": "Grants comment access to a post, allowing to create comments on a post",
        "read:group": "Grants read access to a group, allowing to see all posts and users",
        "post:group": "Grants write access to a groups' posts, allowing the user to create new posts in the group",
        "admin:group": "Grants admin access to a group, allowing to add and remove users to it, as well as inviting other users"
      }
    }
  },
  "paths": {
    "/groups": {
      "post": {
        "summary": "Create a new group",
        "tags": [
          "group"
        ],
        "description": "Allows you to create a new `Group` object\n",
        "operationId": "addGroup",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Group object that needs to be added to the store",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Group"
            }
          }
        ],
        "responses": {
          "405": {
            "description": "Invalid Input"
          }
        },
        "security": [
          {
            "openLabImplicit": [
              "read:group"
            ]
          }
        ]
      },
      "put": {
        "tags": [
          "group"
        ],
        "summary": "Update an existing Group",
        "description": "",
        "operationId": "updateGroup",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Group object to be updated",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Group"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Invalid ID supplied"
          },
          "404": {
            "description": "Group not found"
          },
          "405": {
            "description": "Validation Exception"
          }
        },
        "security": [
          {
            "openLabImplicit": [
              "admin:group"
            ]
          }
        ]
      },
      "get": {
        "summary": "Get a bunch of gropus",
        "description": "Gets `Group` objects.\nOptional query param of **size** determines\nsize of returned array\n",
        "parameters": [
          {
            "name": "size",
            "in": "query",
            "description": "Size of array",
            "required": false,
            "type": "number",
            "format": "double"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "schema": {
              "title": "ArrayOfGroups",
              "type": "array",
              "items": {
                "$ref": "#/definitions/Group"
              }
            }
          }
        },
        "security": [
          {
            "openLabImplicit": [
              "read:group"
            ]
          }
        ]
      }
    },
    "/groups/{groupId}": {
      "get": {
        "tags": [
          "group"
        ],
        "summary": "Find group by ID",
        "description": "Returns a group with the specified id\n",
        "operationId": "getGroupById",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "path",
            "name": "groupId",
            "description": "ID of the Group to be fetched",
            "required": true,
            "type": "integer",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "schema": {
              "$ref": "#/definitions/Group"
            }
          },
          "400": {
            "description": "Invalid ID supplied"
          },
          "404": {
            "description": "Group not found"
          }
        },
        "security": [
          {
            "openLabImplicit": [
              "read:group"
            ]
          }
        ]
      },
      "put": {
        "tags": [
          "group"
        ],
        "summary": "Update an existing group",
        "description": "Updates a group given an id\n",
        "operationId": "updateGroupById",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "path",
            "name": "groupId",
            "description": "ID of the Group to be updated",
            "required": true,
            "type": "integer",
            "format": "int64"
          },
          {
            "in": "body",
            "name": "body",
            "description": "Group object that needs to be updated",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Group"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Invalid ID supplied"
          },
          "404": {
            "description": "Group not found"
          },
          "405": {
            "description": "Validation exception"
          }
        },
        "security": [
          {
            "openLabImplicit": [
              "admin:group"
            ]
          }
        ]
      }
    },
    "/groups/{groupId}/posts": {
      "get": {
        "tags": [
          "post"
        ],
        "summary": "Gets all posts for a group",
        "operationId": "getPosts",
        "description": "Gets all posts on a given group. In order to query for posts,\nyou can provide an offset, and the number of posts to return (defaults to 10).\nPosts are returned in chronological order.\n",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "path",
            "name": "groupId",
            "description": "Id of the Group to get posts for",
            "required": true,
            "type": "integer",
            "format": "int64"
          },
          {
            "in": "query",
            "name": "offset",
            "description": "How many posts to start from to paginate",
            "required": false,
            "type": "integer",
            "format": "int32"
          },
          {
            "in": "query",
            "name": "number",
            "description": "How many posts to return",
            "required": false,
            "type": "integer",
            "format": "int32"
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Post"
              }
            }
          },
          "400": {
            "description": "Invalid groupID supplied"
          }
        },
        "security": [
          {
            "openLabImplicit": [
              "read:group",
              "read:post"
            ]
          }
        ]
      },
      "post": {
        "tags": [
          "post"
        ],
        "summary": "Add a new post to the store",
        "operationId": "addPost",
        "description": "Adds a new post to the store, requires\nthe user to have rights to post to the\ngroup\n",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "path",
            "name": "groupId",
            "description": "ID of the Group to post to",
            "required": true,
            "type": "integer",
            "format": "int64"
          },
          {
            "in": "body",
            "name": "body",
            "description": "The body of the Post object to be added to the store",
            "schema": {
              "$ref": "#/definitions/Post"
            }
          }
        ],
        "responses": {
          "405": {
            "description": "Invalid input"
          }
        },
        "security": [
          {
            "openLabImplicit": [
              "write:group",
              "write:post",
              "read:post"
            ]
          }
        ]
      }
    },
    "/groups/{groupId}/posts/{postId}": {
      "get": {
        "tags": [
          "post"
        ],
        "summary": "Get post by ID",
        "description": "Gets a post given an ID, provided the user\nhas read rights to the group the post belongs to\n",
        "operationId": "getPostById",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "path",
            "name": "groupId",
            "description": "Id of the Group the post belongs to",
            "required": true,
            "type": "integer",
            "format": "int64"
          },
          {
            "in": "path",
            "name": "postId",
            "description": "ID of the post to be fetched",
            "required": true,
            "type": "integer",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Operation",
            "schema": {
              "$ref": "#/definitions/Post"
            }
          },
          "400": {
            "description": "Invalid ID supplied"
          },
          "404": {
            "description": "Post not found"
          }
        },
        "security": [
          {
            "openLabImplicit": [
              "read:group",
              "read:post"
            ]
          }
        ]
      },
      "put": {
        "tags": [
          "post"
        ],
        "summary": "Update a post by ID",
        "operationId": "updatePostById",
        "description": "Allows updating a post by passing the\nid as part of the path\n",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "path",
            "name": "groupId",
            "description": "Id of the Group the post belongs to",
            "required": true,
            "type": "integer",
            "format": "int64"
          },
          {
            "in": "path",
            "name": "postId",
            "description": "ID of the post to be updated",
            "required": true,
            "type": "integer",
            "format": "int64"
          },
          {
            "in": "body",
            "name": "body",
            "description": "the body of the post to be updated,\nincluding properties to be updated.\n",
            "schema": {
              "$ref": "#/definitions/Post"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Invalid ID supplied"
          },
          "404": {
            "description": "Post not found"
          },
          "405": {
            "description": "Validation exception"
          }
        },
        "security": [
          {
            "openLabImplicit": [
              "read:group",
              "write:group",
              "write:post",
              "read:post"
            ]
          }
        ]
      },
      "delete": {
        "tags": [
          "post"
        ],
        "summary": "Deletes a Post given an id",
        "operationId": "deletePostById",
        "description": "If given an id of a valid post that the user\nhas write rights to, it will be deleted from the\nstore\n",
        "parameters": [
          {
            "in": "path",
            "name": "groupId",
            "description": "Id of the Group the post belongs to",
            "required": true,
            "type": "integer",
            "format": "int64"
          },
          {
            "in": "path",
            "name": "postId",
            "description": "ID of the post to be deleted",
            "required": true,
            "type": "integer",
            "format": "int64"
          }
        ],
        "responses": {
          "400": {
            "description": "Invalid ID supplied"
          },
          "404": {
            "description": "Post not found (might already be deleted)"
          }
        },
        "security": [
          {
            "openLabImplicit": [
              "read:group",
              "write:group",
              "write:post",
              "read:post"
            ]
          }
        ]
      }
    },
    "/groups/{groupId}/posts/findByTags": {
      "get": {
        "summary": "Finds posts by tag",
        "description": "Multiple tags can be passed with comma-separated strings\n",
        "operationId": "findPostsByTags",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "path",
            "name": "groupId",
            "description": "Id of the group to search in",
            "required": true,
            "type": "integer",
            "format": "int64"
          },
          {
            "in": "query",
            "name": "tags",
            "description": "Tags to filter posts by",
            "required": false,
            "type": "array",
            "items": {
              "type": "string"
            },
            "collectionFormat": "multi"
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Post"
              }
            }
          },
          "400": {
            "description": "Invalid groupId supplied"
          }
        },
        "tags": [
          "post",
          "tag"
        ],
        "security": [
          {
            "openLabImplicit": [
              "read:group",
              "read:post"
            ]
          }
        ]
      }
    },
    "/groups/{groupId}/posts/findByAuthor": {
      "get": {
        "summary": "Finds posts by author",
        "description": "Finds posts for an author\n",
        "operationId": "findPostsByAuthorId",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "path",
            "name": "groupId",
            "description": "Id of the Group the posts belong to",
            "required": true,
            "type": "integer",
            "format": "int64"
          },
          {
            "in": "query",
            "name": "authorId",
            "description": "Author Id to filter posts by",
            "required": true,
            "type": "integer",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Post"
              }
            }
          },
          "400": {
            "description": "Invalid author ID supplied"
          }
        },
        "tags": [
          "post",
          "user"
        ],
        "security": [
          {
            "openLabImplicit": [
              "read:post"
            ]
          }
        ]
      }
    },
    "/groups/{groupId}/users": {
      "get": {
        "summary": "Get all the users in a group",
        "description": "By passing a group id, returns all users\nthat are members of a group\n",
        "operationId": "getUsersByGroup",
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/User"
              }
            }
          },
          "400": {
            "description": "Invalid group id"
          }
        },
        "parameters": [
          {
            "in": "query",
            "name": "groupId",
            "description": "The name of the group to query users for",
            "required": true,
            "type": "string"
          }
        ],
        "security": [
          {
            "openLabImplicit": [
              "user"
            ]
          }
        ],
        "tags": [
          "user"
        ]
      }
    },
    "/users": {
      "post": {
        "summary": "creates a new User",
        "description": "This creates a new user. It requires a valid\ninvitation token, which is generated at the\ninvitation step\n",
        "operationId": "createUser",
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Created user object",
            "required": true,
            "schema": {
              "$ref": "#/definitions/User"
            }
          },
          {
            "in": "query",
            "name": "invitationId",
            "description": "the id of the invitation for the user's email\n",
            "required": true,
            "type": "integer",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "Operation Successful",
            "schema": {
              "$ref": "#/definitions/User"
            }
          },
          "400": {
            "description": "Invalid Invitation Token ID"
          },
          "405": {
            "description": "Validation exception"
          }
        },
        "security": [
          {
            "openLabImplicit": [
              "user"
            ]
          }
        ],
        "tags": [
          "user"
        ]
      }
    },
    "/users/{userId}": {
      "get": {
        "summary": "gets a user by ID",
        "description": "Finds a user by ID",
        "operationId": "getUserById",
        "parameters": [
          {
            "in": "path",
            "name": "userId",
            "description": "The user id to get\n",
            "required": true,
            "type": "integer",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "Operation Successful",
            "schema": {
              "$ref": "#/definitions/User"
            }
          },
          "400": {
            "description": "Invalid User ID"
          },
          "404": {
            "description": "User not found"
          }
        },
        "security": [
          {
            "openLabImplicit": [
              "user"
            ]
          }
        ],
        "tags": [
          "user"
        ]
      },
      "put": {
        "summary": "updates a user by ID",
        "description": "Updates a user given an ID",
        "operationId": "updateUserById",
        "responses": {
          "400": {
            "description": "Invalid User ID"
          },
          "404": {
            "description": "User not found"
          }
        },
        "parameters": [
          {
            "in": "path",
            "name": "userId",
            "description": "The user id to update\n",
            "required": true,
            "type": "integer",
            "format": "int64"
          },
          {
            "in": "body",
            "name": "body",
            "required": true,
            "description": "The user object to be updated\n",
            "schema": {
              "$ref": "#/definitions/User"
            }
          }
        ],
        "security": [
          {
            "openLabImplicit": [
              "user"
            ]
          }
        ],
        "tags": [
          "user"
        ]
      }
    },
    "/users/findByName": {
      "get": {
        "summary": "gets users by name",
        "description": "search for a user by name",
        "operationId": "getUsersByName",
        "responses": {
          "200": {
            "description": "succesful operation",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/User"
              }
            }
          },
          "400": {
            "description": "Invalid name"
          },
          "404": {
            "description": "User not found"
          }
        },
        "parameters": [
          {
            "in": "query",
            "name": "name",
            "description": "Real name of the userto search for",
            "required": true,
            "type": "string"
          }
        ],
        "security": [
          {
            "openLabImplicit": [
              "user"
            ]
          }
        ],
        "tags": [
          "user"
        ]
      }
    },
    "/users/findByInstitution": {
      "get": {
        "summary": "gets users for an institution",
        "description": "lists all users that belong to a given institution",
        "operationId": "getUsersByInstitution",
        "responses": {
          "200": {
            "description": "succesful operation",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/User"
              }
            }
          },
          "400": {
            "description": "Invalid institution name"
          },
          "404": {
            "description": "Institution not found"
          }
        },
        "parameters": [
          {
            "in": "query",
            "name": "institution",
            "description": "Name of institution",
            "required": true,
            "type": "string"
          }
        ],
        "security": [
          {
            "openLabImplicit": [
              "user"
            ]
          }
        ],
        "tags": [
          "user"
        ]
      }
    },
    "/users/login": {
      "post": {
        "summary": "logs the user in",
        "description": "This endpoint allows a user to login onto the system\n",
        "operationId": "loginUser",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "login",
            "description": "The username (email or username) of the user that wants to login",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Login"
            }
          }
        ],
        "tags": [
          "user"
        ],
        "responses": {
          "200": {
            "description": "succesful operation",
            "schema": {
              "type": "string"
            },
            "headers": {
              "X-Rate-Limit": {
                "type": "integer",
                "format": "int32",
                "description": "calls per hour allowed by the user"
              },
              "X-Expires-after": {
                "type": "string",
                "format": "date-time",
                "description": "date in UTC when the token expires"
              }
            }
          },
          "400": {
            "description": "Invalid username/password supplied"
          }
        }
      }
    },
    "/users/logout": {
      "get": {
        "tags": [
          "user"
        ],
        "summary": "Logs out the currently logged in user session",
        "description": "",
        "operationId": "logoutUser",
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "default": {
            "description": "successful operation"
          }
        }
      }
    },
    "/groups/{groupId}/invitations": {
      "post": {
        "summary": "Creates an invitation",
        "description": "This endpoint allows users with admin rights to a group to\nto invite users to openLab\n",
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "$ref": "#/definitions/Invitation"
            }
          }
        },
        "parameters": [
          {
            "in": "path",
            "name": "groupId",
            "description": "The id of the group to see invitations for\n",
            "required": true,
            "type": "integer",
            "format": "int64"
          },
          {
            "in": "body",
            "name": "body",
            "description": "The Invitation body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Invitation"
            }
          }
        ],
        "security": [
          {
            "openLabImplicit": [
              "user",
              "admin:group"
            ]
          }
        ],
        "tags": [
          "user",
          "group"
        ]
      }
    },
    "/groups/{groupId}/invitations/{invitationId}": {
      "get": {
        "summary": "Gets an Invitation",
        "description": "Gets an Invitation\n",
        "responses": {
          "200": {
            "description": "Succesful Operation",
            "schema": {
              "$ref": "#/definitions/Invitation"
            }
          },
          "400": {
            "description": "Invalid ID - Invitation expired"
          },
          "404": {
            "description": "Invitation not found"
          }
        },
        "parameters": [
          {
            "in": "path",
            "name": "groupId",
            "description": "the id of the group that the invitation is for\n",
            "required": true,
            "type": "integer",
            "format": "int64"
          },
          {
            "in": "path",
            "name": "invitationId",
            "description": "The id of the Invitation to be retrieved",
            "required": true,
            "type": "integer",
            "format": "int64"
          }
        ],
        "security": [
          {
            "openLabImplicit": [
              "user",
              "admin:group"
            ]
          }
        ],
        "tags": [
          "user"
        ]
      },
      "put": {
        "summary": "Updates an Invitation",
        "description": "Used to update the Invitation once it's accepted\n",
        "responses": {
          "400": {
            "description": "Invalid Invitation id"
          },
          "404": {
            "description": "Invitation not found"
          },
          "405": {
            "description": "Validation exception"
          }
        },
        "parameters": [
          {
            "in": "path",
            "name": "groupId",
            "description": "the id of the group that the invitation is for\n",
            "required": true,
            "type": "integer",
            "format": "int64"
          },
          {
            "in": "path",
            "name": "invitationId",
            "description": "The id of the Invitation to be retrieved",
            "required": true,
            "type": "integer",
            "format": "int64"
          },
          {
            "in": "body",
            "name": "body",
            "description": "the body of the invitiation to be updated\n",
            "schema": {
              "$ref": "#/definitions/Invitation"
            }
          }
        ]
      }
    }
  },
  "definitions": {
    "User": {
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "username": {
          "type": "string"
        },
        "profilePicURL": {
          "type": "string"
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "password": {
          "type": "string"
        },
        "organisation": {
          "type": "string"
        },
        "location": {
          "type": "string"
        },
        "permissions": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Permission"
          }
        },
        "groups": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Group"
          }
        },
        "subscriptions": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Subscription"
          }
        }
      }
    },
    "Subscription": {
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "type": {
          "type": "string"
        },
        "email": {
          "type": "boolean"
        }
      }
    },
    "Group": {
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "groupPicURL": {
          "type": "string"
        },
        "members": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/User"
          }
        },
        "parentGroupId": {
          "type": "integer",
          "format": "int64"
        }
      }
    },
    "Post": {
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "author": {
          "$ref": "#/definitions/User"
        },
        "dataBundle": {
          "$ref": "#/definitions/DataBundle"
        },
        "title": {
          "type": "string"
        },
        "body": {
          "type": "string"
        },
        "tags": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Tag"
          }
        },
        "parentPostId": {
          "type": "integer",
          "format": "int64"
        },
        "comments": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Comment"
          }
        }
      }
    },
    "Comment": {
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "author": {
          "$ref": "#/definitions/User"
        },
        "postId": {
          "type": "integer",
          "format": "int64"
        }
      }
    },
    "Permission": {
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "actionToken": {
          "type": "string"
        },
        "groupId": {
          "type": "integer",
          "format": "int64"
        }
      }
    },
    "Invitation": {
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "creatorId": {
          "type": "integer",
          "format": "int64"
        },
        "recipientEmail": {
          "type": "string"
        },
        "accepted": {
          "type": "boolean"
        }
      }
    },
    "DataBundle": {
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "postId": {
          "type": "integer",
          "format": "int64"
        },
        "cover": {
          "type": "string"
        },
        "files": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/File"
          }
        }
      }
    },
    "Tag": {
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "File": {
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "previewPicURL": {
          "type": "string"
        },
        "fileSourceURL": {
          "type": "string"
        }
      }
    },
    "Login": {
      "properties": {
        "username": {
          "type": "string"
        },
        "password": {
          "type": "string"
        }
      }
    }
  }
}
```
