const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const secret = 'secret';



const registerNewUser = async (req, res) => {
    const {firstName,lastName,email,password} = req.body;
   
    try {
        if (email & password  == null ) {
            res.status(201).json({meassage:"Please fill up the form" });
            res.end();
        }
        const oldUser = await User.findOne({email})
        if (oldUser) {
            return res.status(400).json({meassage:"User alrady EXIST"})
        }
        const hashedPassword = await bcrypt.hash(password,12);
        const result = await User.create({
            email,
            name:`${firstName} ${lastName}`,
            password:hashedPassword,
        })
        const  token = jwt.sign({email: result.email,name: result.name,password: result.password,id:result._id},secret,{expiresIn:"1h"})

        return res.status(201).json({meassage:"User creation done",result:result,token:token})
    } catch (error) {
        console.log(error);
        res.status(201).json({meassage:error})
    }
}

//
const signIn = async (req, res) => {
    const {email,password} = req.body;  
 
    try {
        const oldUser = await User.findOne({email})
        if (!oldUser) {
            return res.status(400).json({meassage:"User Not found"})
        };
        const isMatch = await bcrypt.compare(password,oldUser.password);
        
        if (!isMatch) {
            return res.status(400).json({meassage:"password is not correct"})
        };
        const token = jwt.sign({email:oldUser.email, id:oldUser._id},secret,{expiresIn:"1h"})
        res.status(200).json({meassage:"User login successfully",result:oldUser,token});
        

    } catch (error) {
        console.log(error);
        res.status(500).json({meassage:error})
    }
}
//
  const GoogleLogin  = async (req, res) =>{
    const { name,email,token,googleId} = req.body;
    //
    try {
        const oldUser = await User.findOne({email})
        if (oldUser) {
            const result = {_id:oldUser._id.toString(),email,name}
            return res.status(200).json({result,token})
        };
        const result = await User.create({
            email,
            name,
            googleId,             
        })
        return res.status(200).json({result,token})       


    } catch (error) {
        return res.status(400).json({meassage:"Something is wrong"})
    }
}




// get all user data

const allUser= async (req, res) =>{

  
    
        try {
            const users = await  User.find({});
            console.warn(users.length);
            return   res.status(200).json({users});
            
        } catch (error) {
            return res.status(500).json({message: error.message});
          
        }
 
       
}
// edit user
const UpdateUser = async (req, res) =>{
    try { 
        let user = await User.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,            
        });
        if (!user) {
            return  res.status(404).json({message : 'user not found '});
        }
        res.status(200).json({message : 'user delete succesfully',data:user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



// get singel user data

const SingleUser = async (req, res) =>{
    try { 
        let id = req.params.id;
        let user = await User.findOne({_id : id , googleId:id});
        if (!user) {
            return  res.status(404).json({message : 'user not found '});
        }
        res.status(200).json({data:user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// delete user
const deleteUser = async (req, res) =>{
    try { 
        let user = await User.deleteOne({_id:req.params.id});
        if (!user) {
            return  res.status(404).json({message : 'user not found '});
        }
        res.status(200).json({message : 'user delete succesfully',data:user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// delete all user
const AllUserDeleted = async (req, res) =>{
    try { 
        let user = await User.deleteMany();        
        res.status(200).json({message : 'All user delete succesfully',data:user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}




module.exports ={
    registerNewUser,
    signIn,
    allUser,
    SingleUser,
    GoogleLogin,
    AllUserDeleted
}