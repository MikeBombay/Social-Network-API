const { Thought } = require('../models');

const thoughtController = {  
    getAllThoughts(req, res) {
    Thought.find({}).select("-__v")
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
},

getThoughtById({ params }, res) {
  Thought.findOne({ _id: params.id })
  .populate({
    path: 'reactions',
    select: '-__v'
})
.select('-__v')
.sort({ _id: -1 })
.then(dbThoughtData => res.json(dbThoughtData))
.catch(err => {
   console.log(err);
   res.status(500).json(err)
})
},

createThought({ params, body }, res) {
  Thought.create(body)
  .then(({ _id}) => {
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { thoughts: _id } },
        { new: true, runValidators: true }
      );
    })
  .then(dbUserData => {
      if (!dbUserData) {
          res.status(404).json({ message: 'username not found'});
          return;
      }
      res.json(dbUserData);
  })
  .catch(err => res.json(err));
},

addReaction ({ params, body}, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true }
    ).select("-__v")
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: "thought not found" });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch((err) => res.status(400).json(err));
},


removeReaction({ params, body }, res) {
    
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: body.reactionId } } },
        { new: true }
    )
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
},


updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.id }, 
        body,
        { new: true, runValidators: true }
    )
    .then(updatedThought => {
        if (!updatedThought) {
            return res.status(404).json({ message: 'thought not found' });
        }
    res.json(updatedThought);
    })
    .catch(err => res.json(err));
},
deleteThought({ params, body}, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(deletedThought => {
        if (!deletedThought) {
            return res.status(404).json({ message: 'thought not found'})
        }
        res.json(deletedThought);
    })
    .catch(err => res.json(err));
}
};



module.exports = thoughtController