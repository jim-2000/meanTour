const mongoose = require('mongoose');


const tourSchema = new mongoose.Schema({
    creator:String,
    name:String,
    title :{
        type: String,
        required: [true, 'A tour must have a title'],
        
    },
    description:{
        type: String,
        required: [true, 'A tour must have some description'],        
    },
    destination:{
        type: String,
        required: [true, 'A tour must have a destination'],
    },
    duration:{
        type: Number,       
        default: 1,
    },
    maxGroupSize:{
        type: Number,
        default: 2,
    },
    tags:[String],
    imageFile:String,
    createdAt:{
        type: Date,
        default: Date.now(),        
    },
    likes:{
        type: [Number],
        default: 0,
    },
    price:{
        type: Number,
        default: 1000,
    }    


});
const TourModal = mongoose.model('Tour', tourSchema);
module.exports = TourModal;

