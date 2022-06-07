const mongoose = require('mongoose');
const TourModal = require('../model/tour');
const {upload} = require("./coudinary")
 
 
//
const CrateTour = async (req, res) => {
    const tour = req.body;
    const file = await upload.TourImage(tour.imageFile); 
   
    const newTour = new TourModal({
        ...tour,
        imageFile:file,
        creator: req.userId,
        createdAt: new Date().toISOString(),
      });
    
      try {
        await newTour.save();
        res.status(201).json(newTour);

      } catch (error) {
        return res.status(404).json({ message: "Something went wrong" });       
      } 
  
}

//
const getAllTour = ("/",  async (req, res) => {
     const {page} =req.query;
    try {
        
         console.log(Number(page));
        const limit = 6 ;
        const startIndex = (Number(page) - 1) * limit;
        const totalTour = await TourModal.countDocuments({});
        const tours = await TourModal.find().limit(limit).skip(startIndex)
        return res.status(200).json({
            data:tours,
            currentPage: Number(page),
            totalTour:totalTour,
            numberOfPages : Math.ceil(totalTour / limit),
        });             

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
    console.log("deleted all");
    try { 
        const  tour = await TourModal.deleteMany()
       return res.status(202).json(tour);
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
        const  tour = await TourModal.findByIdAndRemove(id);       
        res.status(200).json(tour);
    } catch (error) {
        console.log(error);
    }
}
// updateing tour
const updateTourData = async (req,res)=>{
    const {id} = req.params;
    const { title, description, creator, imageFile, tags } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: "Id does't not Exist"});
    }   
    let file;
    try {
         imageFile && await upload.TourImage(imageFile);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No tour exist with id: ${id}` });
          }
      
          const updatedTour = {
            creator,
            title,
            description,
            tags,
            imageFile:file,
            _id: id,
          };
          console.log(updatedTour,file);
          await TourModal.findByIdAndUpdate(id, updatedTour, { new: true });
          return res.json(updatedTour);
    } catch (error) {
        console.log(error);
    }
}

// GET TOUR BY SEARCH>>>>>>>>>>>>>>>>>




const getTourBySearch = async (req,res)=>{
    const {searchQuery} = req.query;
    try {
        const title = new RegExp(searchQuery,"i");
        const tours = await TourModal.find({title})
        return res.status(200).json(tours); 
    } catch (error) {
        console.log(error);
        return res.status(404).json(error); 
    }
}

// GET TOUR BY TAG>>>>>>>>>>>>>>>>>
const getTourByTag = async (req,res)=>{
    const {tag} = req.params;
    try {
        const tours = await TourModal.find({tags: { $in:tag }})
        return res.status(200).json(tours); 
    } catch (error) {
        console.log(error);
        return res.status(404).json(error); 
    }
}



// GET RELATEDTOUR BY >>>>>>>>>>>>>>>>>
const getRelatedTourByTag = async (req,res)=>{
    const tags = req.body;
    try {
        const tours = await TourModal.find({tags: { $in:tags }})
        return res.status(200).json(tours); 
    } catch (error) {
        
        return res.status(404).json(error); 
    }
}

// LIKE TOUR 
  const LikeAtour = async (req,res)=>{
      const {id} = req.params;
     try {
        if (!req.userId) {
          return res.json({message:"User is Not Authenticated"})
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No tour exist with id: ${id}` });
        }

        const tour = await TourModal.findById(id);
        const index = tour.likes.findIndex((id)=>id === String(req.userId));
        if (index === -1) {
            tour.likes.push(req.userId);
        }else{
            tour.likes = tour.likes.filter((id)=> id !== String(req.userId) );
        }     
    
        const updatedTour = await TourModal.findByIdAndUpdate(id,tour,{new:true});
        return res.json(updatedTour); 
     } catch (error) {
        return res.status(404).json(error); 
     }
 }




// cloud image chekcing 
const Cloud =  async(req,res)=>{    
    const tour = req.body;
    console.log(tour);
    // const file = await upload.TourImage(tour.imageFile); 
    const newTour = new TourModal({
        ...tour,
        // imageFile:file,
        creator: req.userId,
        createdAt: new Date().toISOString(),
    });
    try {
        await newTour.save();       
        return res.status(200).json({ message: "POST CREATE SUCCESSFULLY DONE",newTour}); 

    } catch (error) {
        return res.status(404).json({ message: "Something went wrong" });       
    } 
    
}
 








//
module.exports ={
    getAllTour,  
    CrateTour,
    deleteAlltour,
    SingleTourDelete,
    SingelTour,
    getTourByUser,
    updateTourData,
    getTourBySearch,
    getTourByTag,
    getRelatedTourByTag,
    LikeAtour,
    Cloud,
  
}