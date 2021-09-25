const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
        match: [],
      },
      thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },

    {
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
      }
    );
    ///create friend virtual
    const User = model("User", userSchema);
    module.exports = User;