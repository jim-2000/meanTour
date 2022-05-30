const express = require('express');
const { getAllTour,CrateTour, deleteAlltour, SingleTourDelete, SingelTour, getTourByUser, Cloud, updateTourData, getTourBySearch } = require('../controller/tour');
const { registerNewUser,allUser,signIn, GoogleLogin, AllUserDeleted } = require('../controller/user');
const { auth } = require('../middleware/authmiddlewear');
const {redis_set_tour} = require('../middleware/redis/tourRedis') 
 
const router = express.Router();
//
router.route('/').get(getAllTour);
//
router.route('/').post(auth,CrateTour);
//
router.route('/singel/:id').get(SingelTour);
//
router.route('/delete/:id').get(auth,SingleTourDelete);
//
router.route('/update/:id').patch(auth,updateTourData);
//
router.route('/all/delete').get(deleteAlltour);
//
router.route('/user/tour/:id').get(getTourByUser);
//
router.route("/search").get(getTourBySearch);
//
router.route('/cloud/').post(Cloud,);





//
router.route('/join/signup/').post(registerNewUser);
//
router.route('/join/login/').post(signIn);
//
router.route('/join/google/').post(GoogleLogin);
//

router.route("/users/").get(allUser);
//
router.route("/users/removeall/").get(AllUserDeleted);
// router.route('/:id').get( ).patch(updateTask).delete( );

module.exports = router;