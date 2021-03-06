const router = require('express').Router();
const usersController = require('../controllers/usersController');
// const knex = require('knex')(require('../knexfile').development);
const authenticator = require('../middleware/authenticator.js')

//could also do router.use for middleware here

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
    .route('/:user/profilesandfriendrequests')
    .get(usersController.profilesFriendRequestData)

router
    .route('/:user')
    .get(usersController.profile)
    .patch(authenticator, usersController.patchProfile);

router
    .route('/:user/authenticate')
    .get(usersController.authenticate);

router
    .route('/:user/current')
    .get(usersController.currentUser);

router
    .route('/:user/likes')
    .get(usersController.userLikes)
    .post(authenticator, usersController.addUserLikes);

router
    .route('/:user/likes/:id')
    .delete(authenticator, usersController.deleteUserLikes);

router
    .route('/:user/dislikes')
    .get(usersController.userDislikes)
    .post(authenticator, usersController.addUserDislikes);

router
    .route('/:user/dislikes/:id')
    .delete(authenticator, usersController.deleteUserDislikes);

router
    .route('/:user/friends')
    .get(usersController.userFriends)
    .post(authenticator, usersController.confirmFriendRequest);

router
    .route('/:user/friendrequests')
    .get(usersController.userFriendRequests)
    .post(authenticator, usersController.addFriendRequest);

router
    .route('/:user/friendrequests/:id')
    .delete(authenticator, usersController.deleteFriendRequest);


module.exports = router;