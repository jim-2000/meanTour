
 const redis = require('redis');
const TourModal = require('../../model/tour');
 const client = redis.createClient();
//

const connectRedis = async () => {
    try {
        // await client.connect();
        console.log('redis connected');
    } catch (error) {
        console.log(error);
    }
}

 //
 const redis_get_tour = async (req, res,next) => {
     client.get('toursData',(err,data) => {
            if(error){
                console.log(error);
                throw error;

            }else if(data){
                console.log('data from redis');
                res.status(202).json(JSON.parse(data));
            }            
            else{
                console.log('data from db');
                next();
            }
     })
 }
//
const redis_set_tour = async (req, res,next) => {
    const tours = await TourModal.find({});
    client.setEx('toursData',60,JSON.stringify(tours));
    next();
}

//
 module.exports ={
    connectRedis,
        redis_get_tour,
 }