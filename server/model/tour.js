const mongoose = require('mongoose');


const tourSchema = new mongoose.Schema({
    title :{
        type: String,
        required: [true, 'A tour must have a title'],
    },
    description:{
        type: String,
        required: [true, 'A tour must have some description'],        
    },
    creator:String,
    duration:{
        type: Number,
        required: [true, 'A tour must have a duration'],
    },
    maxGroupSize:{
        type: Number,
        required: [true, 'A tour must have a maxGroupSize'],
    },
    tags:[String],
    imageFile:String,
    createdAt:{
        type: Date,
        default: Date.now(),        
    },
    likes:{
        type: Number,
        default: 0,
    },
    // price:{
    //     type: Number,

    // }    


});
const TourModal = mongoose.model('Tour', tourSchema);
module.exports = TourModal;

