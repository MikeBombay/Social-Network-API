const { Thought } = require('../models');

const thoughtController = {  
    getAllThoughts(req, res) {
    User.find({})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

getThoughtById({ params }, res) {
  User.findOne({ _id: params.id })
  .then(dbThoughtData => res.json(dbThoughtData))
  .catch(err => {
      console.log(err);
      res.status(400);
});
},
createThought({ body }, res) {
  User.create(body)
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
},


};
module.exports = thoughtController