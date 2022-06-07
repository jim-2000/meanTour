const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv').config()
//
// cloudinary.config({ 
//     cloud_name: process.env.CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//     secure: true,   
// });
cloudinary.config({ 
  cloud_name: "the-captaion", 
  api_key: "715335848874361", 
  api_secret: "Tf91_RtpDcfkRbMpira_fFGEOio",
  secure: true,   
});


const upload ={};

upload.TourImage = async (file) => {
    try {
      const res = await cloudinary.uploader.upload(file,{
        folder:"tour", 
        public_id:`${Date.now()}`

      });
    
      return res.secure_url;
    } catch (error) {
      return error;
    }
  }

  //...........
  upload.RemoveTourImage = async (id) =>{
    try {
      const res = await cloudinary.uploader.destroy(id,(e,r)=>{
        console.log(r);
      })
      console.log("remove cloudynary",res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  module.exports ={
    upload,
  }