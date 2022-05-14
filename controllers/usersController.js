const knex = require('knex')(require('../knexfile').development);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.index = (_req, res) => {
    knex('profiles')
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => res.status(400).send(`Error retrieving profiles ${err}`));
  };

  exports.newProfile = (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).send('Please provide a username and password in request');
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    const newProfile = {
        name: username,
        about: "",
        profilePicture: "",
        username: username,
        password: hashedPassword
    }

    knex('profiles')
        .insert(newProfile)
        .then((data) => {
            const newUserUrl = `/users/${data[0]}`
            res.status(201).location(newUserUrl).send(newUserUrl);
      })
      .catch((err) => res.status(400).send(`Error creating profile: ${err}`));
  };

  exports.logIn = (req, res) => {
      const { username, password } = req.body

      if (!username || !password) {
        return res.status(400).send("Please enter the required fields.");
      }

      knex('profiles')
      .where({username: username})
      .first()
      .then((user) => {
            const isPasswordCorrect = bcrypt.compareSync(password, user.password)
            const id = user.id

          if (!isPasswordCorrect) {
              return res.status(400).send('Invalid Password')
          }

          const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_KEY,
            { expiresIn: "24h" }
          );

          res.json({token, id})
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send("Invalid credentials");
      });
  }

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