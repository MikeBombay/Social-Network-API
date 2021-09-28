const { User } = require('../models')

const userController = {  
    getAllUsers(req, res) {
    User.find({})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

getUserById({ params }, res) {
  User.findOne({ _id: params.id })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
      console.log(err);
      res.status(400);
});
},
createUser({ body }, res) {
  User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
},


};
module.exports = userController