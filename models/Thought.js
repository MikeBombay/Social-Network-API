const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //get://use moment
       
        },
        username:  {
            type: String,
            required: true,
            ref: 'User'
        },
        //reaction?
    },
        
        {
            toJSON: {
              virtuals: true,
              getters: true
            },
            id: false
        }
)
const Thought = model('Thought', thoughtSchema);
module.exports = Thought;