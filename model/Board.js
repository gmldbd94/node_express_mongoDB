const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./Comment');
const Like = require('./Like');
const boardSchema = new Schema({
    //제목
    title: {
        type: String,
        require: true,
    },
    //내용
    content: {
        type: String,
        require: true,
    },
    //유저
    user: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    //공개 비공개
    active: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    //댓글 
    comments: [{
        type:Schema.Types.ObjectId,
        ref:'Comment'
    }],
    //좋아요 유저
    likes: [{
        type:Schema.Types.ObjectId,
        ref:'User'
    }]

});

//게시물 지우기
boardSchema.pre(/Delete$/, function(next){
    const self = this._conditions._id;
    Comment.deleteMany({board: self}).exec();
    Like.deleteMany({board: self}).exec();
    next();
}); 

// 
// boardSchema.pre('find', function(next){
//     const self = this;
//     self.isLike = true;

//     next();
    
// });


module.exports = mongoose.model('Board', boardSchema);