const mongoose = require('mongoose');
const connectionString = "mongodb+srv://jim-2000:m3ZwxyQFlB0UkemJ@cluster0.zbhug.mongodb.net/blog?retryWrites=true&w=majority"

const connectDb = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log('MongoDB connected...');
    } catch (error) {
        console.log(error);
    }

}
 

module.exports = connectDb;

// mongodb+srv://jim-2000:<password>@cluster0.zbhug.mongodb.net/myFirstDatabase?retryWrites=true&w=majority