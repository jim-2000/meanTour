const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const secret = "secret";
//

const auth = async (req,res,next)=>{
    var token;
    const {authorization} = req.headers;
        token = authorization.split(' ')[1];
        try {     
            const isCustomAuth = token.length < 500;
            let decodedData;
            if(token && isCustomAuth){
                decodedData =   jwt.verify(token,secret);
                req.userId = decodedData?.id;            
                next();            
            }
            else{
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
        
    
    if(!token){
        res.status(404).json({"meassage":"Token does't Exist" }).end()
    }
}
module.exports={
    auth,
}