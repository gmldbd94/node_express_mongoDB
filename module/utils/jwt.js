const jwt = require('jsonwebtoken');
const secretOrPrivateKey = "jwtSecretKey";

const options = {
    algorithm: "HS256",
    expiresIn: "1d",
    issuer: "withDev"
}

const refreshOptions = {
    algorithm: "HS256",
    expiresIn: "1d",
    issuer: "withDev"
}
module.exports = {
    sign: (user) => {
        const payload = {
            userIdx : user.userIdx,
            name : user.name,
            email : user.email
        };
        const result = {
            token: jwt.sign(payload, secretOrPrivateKey, options)           
        };

        return result;
    },    

    verify: (token) => {

        let decoded;
        try{
            decoded = jwt.verify(token,secretOrPrivateKey);
        } catch (err){
            if (err.message === 'jwt expired') {//유효기간 만료
                console.log('expired token');
                return -3;
            } else if (err.message === 'invalid token') {//잘못된 token
                console.log('invalid token');
                return -2;
            } else {
                console.log("error");
                return -2;
            }
        }
        return decoded;//error가 없을 시에 decoded로 return을 한다. 
        }

    } 
