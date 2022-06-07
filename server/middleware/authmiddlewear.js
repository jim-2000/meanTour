const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const secret = "secret";
//

const auth = async (req,res,next)=>{
     console.log(req.headers.authorization);
    try {
        
        const token = req.headers.authorization.split(" ")[1] || req.body.token || req.query.token || req.headers["x-access-token"];
       
        console.log(token);

        const isCustomAuth = token.length < 500;
        let decodedData;
        if(token && isCustomAuth){
            decodedData =   jwt.verify(token,secret);
            req.userId = decodedData?.id;            
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
        res.end()
    }
}
module.exports={
    auth,
}