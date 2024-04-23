import express from 'express';
import { AddBookings, getTourBooking } from '../Controller/BookingController.js';
import { isAuthenticatedUser } from '../middleware/Auth.js';

const router = express.Router()


router.route('/createBooking/:id').post(AddBookings);
router.route('/getTourBooking/:id').get(isAuthenticatedUser,getTourBooking);



export default router;