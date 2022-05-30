const jwt = require('jsonwebtoken');
const secret = 'secret';
const User = require('../model/userModel');
//

const auth = async (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodedData;
        if(token && isCustomAuth){
            decodedData =   jwt.verify(token,secret);
            req.userId = decodedData?.id;
            console.log(req.userId,"User id req.....");
            next();
        }else{
            decodedData =  jwt.decode(token);
            const googleId = decodedData?.sub.toString();
            let user = await User.findOne({googleId});         
            req.userId = user?._id; 
        }
        next();
    } catch (error) {
        console.log(error);
    }
}
module.exports={
    auth,
}