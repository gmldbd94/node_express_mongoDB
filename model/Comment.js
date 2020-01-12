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

//댓글 삭제시
CommentSchema.pre(/Delete$/, async function(next){
    const self = this._conditions._id;

    //댓글일 때
    if(self.parent_comment === undefined){
        const ref_board = await mongoose.model('Board').findById(self.board);
        console.log(ref_board);
        await ref_board.updateOne({$pull: {comments: self}});
    }
    //대댓글 일때
    else{
        const parent_comment = await mongoose.model('Comment').findById(self.parent_comment);
        console.log(parent_comment);
        await parent_comment.updateOne({$pull : {re_comments: self._id}}).exec();
    }
});

module.exports = mongoose.model('Comment', CommentSchema);