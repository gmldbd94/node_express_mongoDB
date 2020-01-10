const jwt = require('./jwt');

const authMiddleware = {
    //middleware
    //미들웨어로 token이 있는지 없는지 확인하고
    //token이 있다면 jwt.verify함수를 이용해서 토큰 hash를 확인하고 토큰에 들어있는 정보 해독
    validToken: async(req, res, next) => {
        const token = req.headers.token;
        if(!token){
            return res.json(util.successFalse(statusCode.BAD_REQUEST, resMessage.EMPTY_TOKEN));
        } else{
            const user = jwt.verify(token);            
            req.decoded = user;            
            next();
        }
    }   
};

module.exports = authMiddleware;