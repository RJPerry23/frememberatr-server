const knex = require('knex')(require('../knexfile').development);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticator = require('../middleware/authenticator')


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
      .select()
      .where('username', username)
      .then(function(rows) {
        if (rows.length===0) {
          // no matching records found
          knex('profiles').insert(newProfile)
          .then((data) => {
            const newUserUrl = `/users/${data[0]}`
            res.status(201).location(newUserUrl).send(newUserUrl);
          })
        } else {
          return res.status(400).send("Username taken.");
        }
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
              return res.status(400).send('Invalid Username or Password')
          }

          const token = jwt.sign(
            { id: user.id },
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

  exports.entireFriendsTable = (_req, res) => {
    knex('user_friends')
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => res.status(400).send(`Error retrieving friends table ${err}`));
  };

  exports.profilesFriendRequestData = (req, res) => {
    knex.from('user_friend_requests')
    .innerJoin('profiles', 'user_friend_requests.profile_id', 'profiles.id')
      .where('user_friend_requests.user_id', req.params.user )
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) =>
      res.status(400).send(`Error retrieving data for profile ${req.params.id} ${err}`)
      );
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

exports.patchProfile = ((req, res, next) => {
      knex('profiles')
      .update(req.body)
      .where({ id: req.decoded.id })
      .then(() => {
        res.status(200).send(`Profile with id: ${req.params.user} has been updated`);
      })
      .catch((err) =>
        res.status(400).send(`Error updating Profile ${req.params.user} ${err}`)
      );
    }  
)

exports.authenticate = (req, res) => {
  // If there is no auth header provided
  if (!req.headers.authorization) {
    return res.status(201).send({auth: false});
  } 

  // Parse the Bearer token
  const authToken = req.headers.authorization.split(" ")[1];

  jwt.verify(authToken, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid auth token");
    }
    if (`${decoded.id}` === req.params.user) {
      return res.status(201).send({auth: true})
    }
    });
  };

exports.currentUser = (req, res) => {
  if (!req.headers.authorization) {
    return res.status(201).send({user: "unknown"});
  } 
  // Parse the Bearer token
  const authToken = req.headers.authorization.split(" ")[1];

  jwt.verify(authToken, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid auth token");
    }
      else {return res.status(201).send({user: decoded.id})}
    });
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

exports.addUserLikes = (req, res) => {
  if (!req.body.likes) {
    return res.status(400).send('Please enter something you like.');
  }
  knex('user_likes')
  .insert(req.body)
  .then((data) => {
    res.status(201).json(data);
  })
  .catch((err) =>
  res
    .status(400)
    .send(
      `Error creating like for user ${req.params.user} ${err}`
    )
  );
}

exports.deleteUserLikes = (req, res) => {
  knex('user_likes')
    .delete()
    .where({ id: req.params.id })
    .then(() => {
      res.status(204).send(`Like with id: ${req.params.id} has been deleted`);
    })
    .catch((err) =>
      res.status(400).send(`Error deleting Like ${req.params.id} ${err}`)
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
            `Error retrieving dislikes for user ${req.params.user} ${err}`
            )
        );
    };

    exports.addUserDislikes = (req, res) => {
      if (!req.body.dislikes) {
        return res.status(400).send('Please enter something you dislike.');
      }
      knex('user_dislikes')
      .insert(req.body)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) =>
      res
        .status(400)
        .send(
          `Error creating dislike for user ${req.params.user} ${err}`
        )
      );
    }
    
    exports.deleteUserDislikes = (req, res) => {
      knex('user_dislikes')
        .delete()
        .where({ id: req.params.id })
        .then(() => {
          res.status(204).send(`Like with id: ${req.params.id} has been deleted`);
        })
        .catch((err) =>
          res.status(400).send(`Error deleting Like ${req.params.id} ${err}`)
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
            `Error retrieving friends for user ${req.params.user} ${err}`
            )
        );
    };  

exports.confirmFriendRequest = (req, res) => {
      if (!req.body.friends) {
        return res.status(400).send('Please confirm a friend request.');
      }
      knex('user_friends')
      .insert(req.body)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) =>
      res
        .status(400)
        .send(
          `Error creating friend request for ${req.params.user} ${err}`
        )
      );
    }

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
            `Error retrieving friend-requests for user ${req.params.user} ${err}`
            )
        );
    };

exports.addFriendRequest = (req, res) => {
      if (!req.body.friend_requests) {
        return res.status(400).send('Please add a friend.');
      }
      knex('user_friend_requests')
      .insert(req.body)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) =>
      res
        .status(400)
        .send(
          `Error creating friend request for ${req.params.user} ${err}`
        )
      );
    }
 

exports.deleteFriendRequest = (req, res) => {
  knex('user_friend_requests')
    .delete()
    .where({ id: req.params.id })
    .then(() => {
      res.status(204).send(`Friend request with id: ${req.params.id} has been deleted`);
    })
    .catch((err) =>
      res.status(400).send(`Error deleting friend request ${req.params.id} ${err}`)
    );
};    

 

