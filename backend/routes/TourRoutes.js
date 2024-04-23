import express from 'express';
import { isAuthenticatedUser } from '../middleware/Auth.js';
import singleupload from '../middleware/multer.js';
import { CreateTour, deleteTour, getMyTours, getTourById, getTours, updateTour } from '../Controller/TourController.js';

const router = express.Router()


router.route('/').get(getTours);
router.route('/createTour').post(isAuthenticatedUser,singleupload,CreateTour);
router.route('/getMyTours').get(isAuthenticatedUser,getMyTours);
router.route('/:id').get(getTourById);
router.route('/:id').delete(isAuthenticatedUser,deleteTour);
router.route('/update/:id').post(isAuthenticatedUser,updateTour);


export default router;