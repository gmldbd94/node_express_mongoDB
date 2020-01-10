//상태코드
const authUtil = require('../module/utils/authUtil');
const utils = require('../module/utils/utils');
const responseMessage = require('../module/utils/responseMessage');
const statusCode = require('../module/utils/statusCode');
//ex>res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.X_NULL_VALUE(missParameters)));

const Board = require('../model/Board');
const User = require('../model/User');
const Comment = require('../model/Comment');

module.exports = {
    //게시물에 댓글 작성하기
    create: async (req, res) => {
        const { user } = req.body;
        let comment = new Comment({
            content : req.body.content,
            board : req.params.board_id,
            user : user,
        });
        result = await comment.save();
        return res.json(result);
    },

    //게시판에 해당하는 댓글 모두 불러오기
    read: async (req, res) =>{
        const result = await Comment.find({board: req.params.board_id})
                                        .populate('user', 'name')
                                        .populate('re_comment');
        return res.json(result);
    },

    //특정 댓글 수정하기(해당 유저인지 확인 추가 할것)
    update: async (req, res) =>{
        let comment = await commnet.findById(req.params.commnet_id);
        comment.content = req.params.content;
        const result = comment.save();
        return res.json(result);
    },

    //특정 댓글 삭제하기
    delete: async (req, res) =>{
        const comment = await Comment.findById(req.params.comment_id);
        
        //특정 댓글에 대댓글이 없을 때
        if(!comment.re_comments){
            await comment.deleteOne({_id: comment._id});
        }
        //특정 댓글에 대댓글이 있을 때
        else{
            comment.content = "삭제가 되었습니다."
            await comment.save();
        }
        return res.json(result);
    },

    //특정 댓글에 대댓글 달기
    re_comment: async (req, res) => {
        const comment = new Comment({
            content : req.body.content,
            user : req.body.user,
            parent_comment : req.params.comment_id
        });
        console.log(comment);
        const result = await comment.save();
        return res.json(result);
    }
}