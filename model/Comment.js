const mongoose = require('mongoose');
const Board = require('./Board');
const User = require('./User');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    board: {
        type: Schema.Types.ObjectId,
        ref: 'Board'
    },
    parent_comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        default: null
    },
    re_comments:[{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    }]
});

//댓글 작성시 해당 게시판의 댓글_배열에 추가
CommentSchema.post('save', async function(next){
    const self = this;
    console.log(self.board);
    if(self.board){
        const ref_board = await mongoose.model('Board').findById(self.board);
        await ref_board.updateOne({$push :{comments: self}}).exec();
    }else{
        const parent_comment = await mongoose.model('Comment').findById(self.parent_comment);
        await parent_comment.updateOne({$push :{re_comments: self}}).exec();
    }
    
});

//댓글 삭제시 해당 게시판 ref_댓글_배열에서 삭제
CommentSchema.pre('deleteOne', async function(next){
    const self = this;
    //해당 게시판
    let ref_board = await mongoose.model('Board').findById(self.board);
    await ref_board.ref_comments.pull(self);
    await ref_board.save();
});


module.exports = mongoose.model('Comment', CommentSchema);