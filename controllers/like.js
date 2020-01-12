//상태코드
const User = require('../model/User');
const Board = require('../model/Board');
const Like = require('../model/Like');

module.exports = {
    toggle_like: async(req, res) => {
        const user = req.body.user;
        const { board_id }  = req.params;
        let result = {};
        const is_liked = await Like.findOne({$and: [{user: user}, {board: board_id}]});
        
        // 해당 게시물에 좋아요 일때
        if(is_liked){
            await Like.findByIdAndDelete(is_liked);
            result = {data : false}
        }
        // 해당 게시물에 좋아요 아닐때
        else{
            //creat에 save명령어도 같이 실행된다.
            await Like.create({
                user: user, 
                board: board_id
            });
            // await liking.save();
            result = {data : true}
        }
        
        return res.json(result);
    }
    
}