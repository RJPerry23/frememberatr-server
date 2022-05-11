const router = require('express').Router();
const usersController = require('../controllers/usersController');
// const knex = require('knex')(require('../knexfile').development);
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

router
    .route('/')
    .get(usersController.index);

router
    .route('/:user')
    .get(usersController.profile);

router
    .route('/:user/likes')
    .get(usersController.userLikes)

router
    .route('/:user/dislikes')
    .get(usersController.userDislikes)

router
    .route('/:user/friends')
    .get(usersController.userFriends)

router
    .route('/:user/friendrequests')
    .get(usersController.userFriendRequests)


module.exports = router;