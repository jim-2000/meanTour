// import express from 'express';
const TourModal = require('../model/tour');
 
//
const CrateTour = async (req, res) => {
    const tour = req.body;
    const newTour = await new TourModal({
        ...tour,
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
const getAllTour = ("/",async (req, res) => {
    try {
        const tours = await TourModal.find({});
        res.status(202).json(tours);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


module.exports ={
    getAllTour,  
    CrateTour,
}