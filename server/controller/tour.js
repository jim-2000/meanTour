const mongoose = require('mongoose');

// import express from 'express';
const TourModal = require('../model/tour');
const redis = require('redis');
const client = redis.createClient();
const {redis_get_tour} = require('../middleware/redis/tourRedis');
const {upload} = require("./coudinary")
 
// multer 
 
 
//
const CrateTour = async (req, res) => {
    const tour = req.body;
    try {
    const file = await upload.TourImage(tour.imageFile); 
    const newTour = await new TourModal({
        ...tour,
        imageFile:file,
        creator:req.userId,
        createdAt:new Date().toISOString(),       
    });
        await newTour.save();
        return res.status(200).json({message:'tour created succesfully',data:{newTour}});      
    } catch (error) {
        return res.status(404).json({message: error.message});       

    }
     
    
}

//
const getAllTour = ("/",  async (req, res) => {
    try {
      
        const tours = await TourModal.find({});
        console.log(tours.length);
        // client.setEx('toursData',60,JSON.stringify(tours));
        return res.status(200).json(tours);             

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})
//
const SingelTour = ('/' , async(req,res)=>{
    //
    const {id} = req.params;
    try {
        const tour = await TourModal.findById(id);
        res.status(202).json(tour);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// get tour by user 

const getTourByUser = async (req,res) =>{
const {id} = req.params;
console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).json({message: "User does't not Exist"});
    }
    const userTours = await TourModal.find({creator:id})
    return  res.status(200).json(userTours);
}



//
const deleteAlltour = async (req,res)=>{
    try {
        const  tour = await TourModal.deleteMany({});
        res.status(202).json(tour);
    } catch (error) {
        console.log(error);
    }
}

//


const SingleTourDelete = async (req,res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: "Post Id does't not Exist"});
    }
    try {
        const  tour = await TourModal.findByIdAndDelete(id);       
        res.status(202).json(tour);
    } catch (error) {
        console.log(error);
    }
}
// updateing tour
const updateTourData = async (req,res)=>{
    const {id} = req.params;
    const {title,desciption,creator,imageFile,tags} = req.body;
    if (imageFile) {
        const file = await upload.TourImage(req.files.imageFile.tempFilePath);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: "Id does't not Exist"});
    }
    const updatedTour={
        creator,
        title,
        desciption,
        tags,
        imageFile:file,
        _id:id,

    }
    try {
        const  Updatetour = await TourModal.findByIdAndUpdate(id,updatedTour,{new:true});      
        res.status(200).json(Updatetour);
    } catch (error) {
        console.log(error);
    }
}

// cloud image chekcing 
const Cloud =  async(req,res)=>{    
    const file = await upload.TourImage(req.files.imageFile.tempFilePath);
    const tour = req.body; 
   const result = {
       ...tour,
       image:file,
       creator:req.userId,
       createdAt:new Date().toISOString(), 
   }
    
 
res.status(200).json(result);
}







//
module.exports ={
    getAllTour,  
    CrateTour,
    deleteAlltour,
    SingleTourDelete,
    SingelTour,
    getTourByUser,
    Cloud,
    updateTourData,
}