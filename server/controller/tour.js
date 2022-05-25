// import express from 'express';
const TourModal = require('../model/tour');
const redis = require('redis');
const client = redis.createClient();
const {redis_get_tour} = require('../middleware/redis/tourRedis');
//

//
const CrateTour = async (req, res) => {
    const tour = req.body;
    const newTour = await new TourModal({
        ...tour,
        creator:req.userId,
        createdAt:new Date().toISOString(),        

    });
    try {
        newTour.save();
        res.status(201).json({message:'tour created succesfully',data:newTour});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//
const getAllTour = ("/",  async (req, res) => {
    try {
      
        const tours = await TourModal.find({});
        console.log(tours.length);
        // client.setEx('toursData',60,JSON.stringify(tours));
        res.status(202).json(tours);
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
    const {id} = req.params.id;
    try {
        const  tour = await TourModal.findByIdAndDelete(id);       
        res.status(202).json(tour);
    } catch (error) {
        console.log(error);
    }
}










//
module.exports ={
    getAllTour,  
    CrateTour,
    deleteAlltour,
    SingleTourDelete,
    SingelTour,
}