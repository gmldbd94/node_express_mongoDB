//상태코드
const utils = require('../module/utils/utils');
const responseMessage = require('../module/utils/responseMessage');
const statusCode = require('../module/utils/statusCode');

//ex>res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.X_NULL_VALUE(missParameters)));
//ex>res.status(statusCode.OK).send(utils.successTrue(responseMessage.BOARD_CREATE_SUCCESS, result));

//mongooseDB
const mongoose = require('mongoose');
const {mongoDBurl}= require('../config/mongoDBconfig');
const User = require('../model/User');

//jwt
//생략

//중복 이메일 확인
async function check_email(email){
    {
        const user = await User.find({email: email});
        console.log(user);
        if(user.length === 0){
            return {data: "해당하는 유저가 없습니다. ", result: false};
        }
        else{
            return {data: "해당하는 유저가 있습니다.", result:true};
        }
    }
}

module.exports = {
    
    //회원가입
    signUp : async(req, res) => {
        var checking = await check_email(req.body.email);
        var user = new User({
            email : req.body.email,
            name : req.body.name,
            password : req.body.passowrd
        });
        console.log(user);
        //해당하는 유저 없음
        if(checking.reulst){
            console.log("이메일 존재")
            return res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.AlREADY_ID));
        }
        //회원가입 진행
        else{
            await user.save();     
            return res.status(statusCode.OK).send(utils.successTrue(responseMessage.SIGN_UP_SUCCESS, user));
        }
    },
    //로그인하기
    signIn : async(req, res) => {
        let checking = await check_email(req.body.email);
        console.log(checking.result);
        //이메일 주소가 있을 때
        if(checking.result){
            const user = await User.find({email: req.body.email, password: req.body.password});
            //비밀번호가 틀렸을 때
            if(user.length === 0){
                return res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.SIGN_IN_FAIL));
            }
            //  로그인 성공
            else{
                return res.status(statusCode.OK).send(utils.successTrue(responseMessage.SIGN_IN_SUCCESS, user));
            }
        }
        //이메일 없을 떄
        else{
            return res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.NO_USER));
        }
    },

    show_all : async(req, res) => {
        var All_user = await User.find();
        return res.json(All_user);
    },

    delete : async(req, res) => {
        await User.deleteOne({_id : req.params.user_id});
        return res.json({message:"유저 삭제 완료"});
    }
    
}