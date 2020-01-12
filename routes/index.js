var express = require('express');
var router = express.Router({mergeParams: true});

const User = require('../controllers/user');
const Board = require('../controllers/board');
const Comment = require('../controllers/comment');
const Like = require('../controllers/like');

//user routes
router.post('/user/signup', User.signUp); //회원가입
router.post('/user/signin', User.signIn); //로그인
router.get('/user/all', User.show_all); //모든회원정보 보기
router.delete('/user/delete/:user_id', User.delete); // 계정 삭제

//board routes
router.get('/board/:page_num', Board.all); // 모든 게시물 보기
router.get('/board/show/:board_id', Board.read); // 특정 게시물 보기
router.post('/board/create', Board.create); // 게시물 작성하기
router.put('/board/update/:board_id', Board.update); // 게시물 수정하기
router.delete('/board/delete/:board_id', Board.delete); // 게시물 삭제하기 

//comment routes
router.get('/comments/:board_id' , Comment.read); // 해당 게시물의 댓글 보기
router.post('/comment/create/:board_id', Comment.create); // 댓글 작성하기
router.delete('/commnet/delete/:comment_id', Comment.delete); // 특정 댓글 삭제하기
router.put('/comment/:comment_id', Comment.update); // 댓글 업데이트하기
router.post('/re_comment/create/:comment_id', Comment.re_comment); // 특정 댓글에 대댓글 남기기

//like routes
router.post('/Like/:board_id', Like.toggle_like);

module.exports = router;