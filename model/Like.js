const mongoose = require('mongoose');
const Board = require('../model/Board');
const User = require('../model/Board');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    board: {
        type: Schema.Types.ObjectId,
        ref: 'Board'
    }
});

//좋아요 할 때 Board에 좋아요 유저 추가하기
LikeSchema.post('save', async function(next){
    const self = this;
    const ref_board = await mongoose.model('Board').findById(self.board);
    await ref_board.updateOne({$push : {likes: this.user}}).exec();
}); 

//좋아요 풀 때 Board에 좋아요 유저 빼기
LikeSchema.pre(/Delete$/, async function(next, doc){
    self = this._conditions._id;
    const ref_board = await mongoose.model('Board').findById(self.board);
    await ref_board.updateOne({$pull : {likes: self.user}}).exec();
})


module.exports = mongoose.model('Like', LikeSchema);

