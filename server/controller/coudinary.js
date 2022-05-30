const cloudinary = require('cloudinary').v2;
//
cloudinary.config({ 
    cloud_name: 'the-captaion', 
    api_key: '715335848874361', 
    api_secret: 'Tf91_RtpDcfkRbMpira_fFGEOio',
    secure: true,    
});

const upload ={};

upload.TourImage = async (file) => {
    try {
      const res = await cloudinary.uploader.upload(file,{
        folder:"tour",
      
      });
      // return the secure url
      return res.secure_url;
    } catch (error) {
      return error;
    }
  }
  

  module.exports ={
    upload,
  }