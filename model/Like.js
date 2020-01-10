const mongoose = require('mongoose');
const Borad = require('../model/Board');
const User = require('../model/Board');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    Board: {
        type: Schema.Types.ObjectId,
        ref: 'Board'
    }
});
LikeSchema.post('save', async function(next){
    const board = await Board.findById(this.board).exec();
    await board.updateOne({$push : {Likes: this}}).exec();
}); 

module.exports = mongoose.model('Like', LikeSchema);

