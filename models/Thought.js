const { Schema, model } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
     
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 280
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("MMM Do, YY")
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );
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
            get: createdAtVal => moment(createdAtVal).format("MMM Do YY")
        },
    
        username:  {
            type: String,
            required: true,
            ref: 'User'
        },
        reactions: [reactionSchema],
        
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

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
  });
  

module.exports = Thought;