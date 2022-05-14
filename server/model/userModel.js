const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//

const userSchema =  Schema({
    name:{type:String,
         required:[true,"Please provide a Name"]
        },
    email:{type:String, required:[
        true,"Email should be unique "
    ], unique:true},
    password:{type:String, required:false},
    googleId:{type:String, required:false},
    id:{type:String, required:false},
})

module.exports = mongoose.model('User', userSchema);