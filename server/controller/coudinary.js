const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv').config()
//
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,   
});



const upload ={};
var staticImage = "https://via.placeholder.com/728x90.png?text=Visit+tourpidea+term+conditione%20C/O%20https://placeholder.com/";
upload.TourImage = async (file) => {
    if (file === undefined || file === null || file === "") {
      return staticImage;
    }else{
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