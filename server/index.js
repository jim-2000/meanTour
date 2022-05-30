const express = require('express');
const connectDb = require('./db/connect');
const port = 4000;
const app = express();
const appRoute = require('./routes/appRoute');
const morgan = require('morgan');
const cors = require('cors'); 
const fileUpload = require('express-fileupload')
const multer  = require('multer')
// configure app to use morgan logger
app.use(morgan('dev'));
app.use(express.json({limit:"200mb", extended:false}));
app.use(express.urlencoded({ limit:"200mb", extended:false}));
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    methods: "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    
}
app.use(cors(corsOptions));
app.use(fileUpload({
    useTempFiles:true,
    // tempFileDir:"img/"
}))
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