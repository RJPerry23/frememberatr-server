const router = require('express').Router();
const usersController = require('../controllers/usersController');
// const knex = require('knex')(require('../knexfile').development);

router
    .route('/')
    .get(usersController.index)
    .post(usersController.newProfile);

router
    .route('/login')
    .post(usersController.logIn);

router
    .route('/friendstable')
    .get(usersController.entireFriendsTable);

router
    .route('/:user')
    .get(usersController.profile);

router
    .route('/:user/likes')
    .get(usersController.userLikes);

router
    .route('/:user/dislikes')
    .get(usersController.userDislikes);

router
    .route('/:user/friends')
    .get(usersController.userFriends);

router
    .route('/:user/friendrequests')
    .get(usersController.userFriendRequests);


module.exports = router;