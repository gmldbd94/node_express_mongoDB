//상태코드
const authUtil = require('../module/utils/authUtil');
const utils = require('../module/utils/utils');
const responseMessage = require('../module/utils/responseMessage');
const statusCode = require('../module/utils/statusCode');
const User = require('../model/User');
const Board = require('../model/Board');
const Like = require('../model/Like');
//ex>res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.X_NULL_VALUE(missParameters)));
module.exports = {
    toggle_like: async(req, res) => {
        const user = req.body.user;
        const { board }  = req.body.params.board_id;
        let result = {};
        const is_liked = await Like.find({user: user, board: board});
        if(is_liked){
            await Like.deleteOne(is_liked);
            result = {data : false}
        }else{
            await Like.save(is_liked);
            result = {data : true}
        }
        
        return res.json(result);
    }
    
}