const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./Comment');
const Like = require('./Like');
const boardSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    user: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    active: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    comments: [{
        type:Schema.Types.ObjectId,
        ref:'Comment'
    }],
    likes: [{
        type:Schema.Types.ObjectId,
        ref:'Like'
    }],
    isLike: {
        type: Boolean
    }

});

boardSchema.pre('deleteOne', function(next){
    const self = this;
    Comment.deleteMany({board_id: self}).exec();
    Like.deleteMany({board_id: self}).exec();
    next();
}); 

boardSchema.pre('find', function(next){
    const self = this;
    self.isLike = true;

    next();
    
});


module.exports = mongoose.model('Board', boardSchema);