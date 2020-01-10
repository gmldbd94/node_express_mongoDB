const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Board = require('./Board');
const Comment = require('./Comment');
const Like = require('./Like');
//trim : 공백열 제거해주는 옵션
//match: 정규식확인해주는 옵션
const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    name: {
        trim: true,
        type: String,
    },
    password: {
        type: String,
        validate: [
            function(password){
                return password.length >= 4;
            },
            'Password should be longer than 4 Charters'
        ]
    }

});

UserSchema.post('deleteOne', async function(next){
    //지우는것만 바로 불러올수 있다.
    await Board.deleteMany({user: this}).exec();
    await Comment.deleteMany({user: this}).exec();
    await Like.deleteMany({user: this}).exec();    
});

module.exports = mongoose.model('User', UserSchema);

