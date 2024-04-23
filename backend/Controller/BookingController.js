import asyncHadnler from 'express-async-handler'
import {Booking} from '../models/Booking.js'


export const AddBookings = asyncHadnler(async (req, res) => {

    const { email , name,numberOfAdults,numberOfChildren,paymentMethod} = req.body;
    const tourId = req.params.id;
    if (!tourId || !email || !name || !numberOfAdults || !numberOfChildren || !paymentMethod) {
        res.status(400);
        throw new Error('All fields are required');
    }


    const booking = new Booking({
        tour : tourId,
        email,
        name,
        numOfAdults:numberOfAdults,
        numOfChilds:numberOfChildren,
        paymentMethod:paymentMethod.value
    });

    const createdBooking = await booking.save();

    res.status(201).json(createdBooking);

})



export const getTourBooking = asyncHadnler(async (req, res) => {
    const user = req.user;

    const tourId = req.params.id;

    const bookings = await Booking.find({tour:tourId}).populate('tour');

    if (!bookings) {
        res.status(404);
        throw new Error('No bookings found');
    }

    if (user._id.toString() !== bookings[0].tour.User.toString()) {
        res.status(401);
        throw new Error('Not Authorized to view bookings');
    }

    res.status(200).json(bookings);

})