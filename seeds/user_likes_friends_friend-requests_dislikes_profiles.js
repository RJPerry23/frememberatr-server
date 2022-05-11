const userLikesData = require('../seed_data/user_likes')
const userDislikesData = require('../seed_data/user_dislikes')
const userFriendsData = require('../seed_data/user_friends')
const userFriendRequestsData = require('../seed_data/user_friend_requests')
const profilesData = require('../seed_data/profiles')

exports.seed = function (knex) {
    return knex('profiles').del()
    .then(function () {
        return knex('profiles').insert(profilesData);
    })
    .then(function () {
        return knex('user_likes').del()    
    })
    .then(function () {
        return knex('user_likes').insert(userLikesData);
    })
    .then(function () {
        return knex('user_dislikes').del()
    })
    .then(function () {
        return knex('user_dislikes').insert(userDislikesData);
    })
    .then(function () {
        return knex('user_friends').del()
    })
    .then(function () {
        return knex('user_friends').insert(userFriendsData);
    })
    .then(function () {
        return knex('user_friend_requests').del()
    })
    .then(function () {
        return knex('user_friend_requests').insert(userFriendRequestsData);
    })
};