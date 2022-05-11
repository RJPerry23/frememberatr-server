const knex = require('knex')(require('../knexfile').development);

exports.index = (_req, res) => {
    knex('profiles')
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => res.status(400).send(`Error retrieving Warehouses ${err}`));
  };

exports.profile = (req, res) => {
    knex('profiles')
        .where({ id: req.params.user })
        .then((data) => {
            if (!data.length) {
                return res.status(404).send(`Profile with id: ${req.params.id} is not found`); 
            }
            res.status(200).json(data[0])
        })
        .catch((err) => res.status(400).send(
            `Error retrieving profile ${req.params.id} ${err}`
        ))
}

exports.userLikes = (req, res) => {
    knex('user_likes')
      .where({ user_id: req.params.user })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) =>
        res
          .status(400)
          .send(
            `Error retrieving likes for user ${req.params.user} ${err}`
          )
      );
  };

exports.userDislikes = (req, res) => {
    knex('user_dislikes')
        .where({ user_id: req.params.user })
        .then((data) => {
        res.status(200).json(data);
        })
        .catch((err) =>
        res
            .status(400)
            .send(
            `Error retrieving likes for user ${req.params.user} ${err}`
            )
        );
    };

exports.userFriends = (req, res) => {
    knex('user_friends')
        .where({ user_id: req.params.user })
        .then((data) => {
        res.status(200).json(data);
        })
        .catch((err) =>
        res
            .status(400)
            .send(
            `Error retrieving likes for user ${req.params.user} ${err}`
            )
        );
    };

exports.userFriendRequests = (req, res) => {
    knex('user_friend_requests')
        .where({ user_id: req.params.user })
        .then((data) => {
        res.status(200).json(data);
        })
        .catch((err) =>
        res
            .status(400)
            .send(
            `Error retrieving likes for user ${req.params.user} ${err}`
            )
        );
    };