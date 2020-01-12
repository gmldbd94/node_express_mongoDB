const Board = require('../model/Board');
const User = require('../model/User');
const Comment = require('../model/Comment');

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
        const page_num = req.params.page_num;
        
        const count_board = await Board.countDocuments();
        const max_page = Math.ceil(count_board/3);
        console.log(max_page);
        let result = await Board.find()
                                    .populate('user','name email')
                                    .skip(page_num * 3 - 3)
                                    .limit(3)
        result.push({"max_page": max_page});
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
        result = await Board.findByIdAndDelete(req.params.board_id);
        return res.json({message: "삭제 완료"});
    }
}