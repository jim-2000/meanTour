const express = require('express');
const connectDb = require('./db/connect');
const port = 4000;
const app = express();
const appRoute = require('./routes/appRoute');
const morgan = require('morgan');
const cors = require('cors');



 
// configure app to use morgan logger
app.use(morgan('dev'));
app.use(express.json({limit:"30mb", extended:true}));
app.use(express.urlencoded({limit:"30mb", extended:true}));
app.use(cors());
app.use('/api/v1/tour', appRoute);




// app.get('/api/v1/blogs')         -get all the blog
// app.post('/api/v1/blogs')        - create new  blog
// app.get('/api/v1/blogs/:id')     -get single blog
// app.patch('/api/v1/blogs/:id')   - update blogs
// app.delete('/api/v1/blogs/:id')  - delete blogs
    // auth
// app.post('/api/v1/blogs/join/login/')        - login new  user
// app.post('/api/v1/blogs/join/signup/')        - create new  user
// app.post('/api/v1/blogs/all/users/')        - create new  user








// username = jim-2000 pass = m3ZwxyQFlB0UkemJ;
//mongodb+srv://jim-2000:<password>@cluster0.zbhug.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//

const start = async () => {
    try {
        // await connectDb(process.env.MONGO_URI);
        await connectDb();
        
        app.listen(port, () => console.log(`Example app listening on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}


//
 
start();