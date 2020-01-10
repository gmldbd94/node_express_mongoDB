//상태코드
const authUtil = require('../module/utils/authUtil');
const utils = require('../module/utils/utils');
const responseMessage = require('../module/utils/responseMessage');
const statusCode = require('../module/utils/statusCode');
//ex>res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.X_NULL_VALUE(missParameters)));

const Board = require('../model/Board');
const User = require('../model/User');
const Comment = require('../model/Comment');

function is_like(){
    const is_like = Like.find({})
    return result;
} 
module.exports = {

    // 게시글 작성하기
    create: async (req, res) =>{
        const { title, content, user } = req.body;
        console.log(content);
        console.log(title);
        const find_user = await User.findById(user._id);
        const board = await Board.create({
            title,
            content: req.body.content,
            user: find_user
        });
        const result = await board.save();
        console.log(result.user_id);
        return res.json(result);
    },

    // 특정 게시글 불러오기
    read: async (req, res) =>{
        const result = await Board.findById(req.params.board_id)
                                    .populate('user','name')
                                    .populate({path: 'comments',
                                                select: 'content re_comments',
                                                populate: {
                                                    path: 'user re_comments', 
                                                    select: 'email name content user',
                                                    populate: {
                                                        path: 'user',
                                                        select: 'email name'
                                                    }
                                                }
                                            });
        return res.json(result);
    },

    // 모든 게시글 불러오기
    all: async (req, res) =>{
        const result = await Board.find()
                                    .populate('user','name email')
        return res.json(result);
    },

    // 특정 게시글 수정하기
    update: async (req, res) =>{
        let board = await Board.findById(req.params.board_id);
        if(!board){
            return res.json({error: "해당 게시물 없음"});
        }else{
            board.title = req.body.title;
            board.content = req.body.content;
            result = await board.save();
            return res.json(result);
        }
    },

    //특정 게시글 삭제하기
    delete: async (req, res) =>{
        result = await Board.delete({id: req.params.board_id});
        return res.json({message: "삭제 완료"});
        
    }
}