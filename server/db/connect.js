const mongoose = require('mongoose');
 
const dotenv = require('dotenv').config()

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected...');
    } catch (error) {
        console.log(`${error} did not connect`)
    }

}
 

module.exports = connectDb;

// mongodb+srv://jim-2000:<password>@cluster0.zbhug.mongodb.net/myFirstDatabase?retryWrites=true&w=majority