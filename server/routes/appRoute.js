const express = require('express');
const { getAllTour,CrateTour, deleteAlltour, SingleTourDelete, SingelTour, getTourByUser } = require('../controller/tour');
const { registerNewUser,allUser,signIn, GoogleLogin } = require('../controller/user');
const { auth } = require('../middleware/authmiddlewear');
 
 
const router = express.Router();

router.route('/').get(getAllTour);
router.route('/').post(auth,CrateTour);
router.route('/singel/:id').get(SingelTour);
router.route('/delete/all').get(deleteAlltour);
router.route('/delete/:id').get(SingleTourDelete);
router.route('/user/tour/:id').get(getTourByUser);





//
router.route('/join/signup/').post(registerNewUser);
router.route('/join/login/').post(signIn);
router.route('/join/google/').post(GoogleLogin);
router.route("/all/users/").get(allUser);
// router.route('/:id').get( ).patch(updateTask).delete( );

module.exports = router;