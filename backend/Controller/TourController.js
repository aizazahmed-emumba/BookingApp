import asyncHadnler from 'express-async-handler'
import {Tour} from '../models/Tour.js'
import  getDataUri  from '../utils/dataUri.js';
import cloudinary from 'cloudinary';


export const getTours = asyncHadnler(async (req, res) => {

    

    let query = {};

    if (req.query.location) {
        query.city = req.query.location;
    }
    if (req.query.priceRange) {
        query.price = { $gte: parseInt(req.query.priceRange)  };
    }

    if (req.query.dateFrom && req.query.dateTo) {
        query.startDate = { $eq : req.query.dateFrom };
        query.endDate = { $eq : req.query.dateTo };
    }
    const tours = await Tour.find(query);

    if (!tours) {
        res.status(404);
        throw new Error('Tours not found');
    }

    res.json(tours);
})


export const getTourById = asyncHadnler(async (req, res) => {

    const tour  = await Tour.findById(req.params.id);

    if (!tour) {
        res.status(404);
        throw new Error('Tour not found');
    }

    res.json(tour);

})


export const getMyTours = asyncHadnler(async (req, res) => {


    if (!req.user) {
        res.status(401);
        throw new Error('Not authorized');
    }   

    const tours = await Tour.find({User: req.user._id});

    if (!tours) {
        res.status(404);
        throw new Error('Tours not found');
    }

    res.json(tours);
})


export const CreateTour = asyncHadnler(async (req, res) => { 
    

        if (!req.user) {
            res.status(401);
            throw new Error('Not authorized');
        }   
    


        const { name, description, price, duration ,  city  } = req.body;


        if(!req.file){
            res.status(400);
            throw new Error('Please upload a Cover Photo');
        }

        
        
        const file = req.file;
        const fileUri =  getDataUri(file);
       

        const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
            transformation: [
              { quality: 'auto' },
              { fetch_format: 'auto', quality: 'auto' }
            ]
          });


            

        const facilities = JSON.parse(req.body.facilities);

        const facilitiesArray = facilities.map((facility , index) => {
            return facility.name
        })
        
        const tour = new Tour({
            name,
            city,
            description,
            price,
            duration,
            startDate : req.body.start_date,
            endDate : req.body.end_date,
            image : myCloud.secure_url,
            facilities :facilitiesArray,
            User: req.user._id
        })
    
        const createdTour = await tour.save();

        console.log(createdTour)
    
        res.status(201).json(createdTour);
 })


 export const deleteTour = asyncHadnler(async (req, res) => {

    const user = req.user;

    const tour = await Tour.findById(req.params.id).populate('User');

    if (!tour) {
        res.status(404);
        throw new Error('Tour not found');
    }

    if (tour.User._id.toString() !== user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }

    const StartDate =  new Date(tour.startDate);

    const currentDate = new Date();


    const differenceInMilliseconds = StartDate.getTime() - currentDate.getTime();

    // Convert the difference to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
    const differenceInDays = Math.ceil(differenceInMilliseconds / (24 * 60 * 60 * 1000));

    // Check if the difference is exactly 3 days
    if (differenceInDays > 3) {
        console.log("u can delete.");
        await tour.remove();
        res.status( 200).json({ message: 'Tour removed' });
    } else {
       res.status(400).json({ message: 'You can not delete this tour' });
    }
 })



 export const updateTour = asyncHadnler(async (req, res) => {

    const user = req.user;
    
    const tour = await Tour.findById(req.params.id).populate('User');

    if (!tour) {
        res.status(404);
        throw new Error('Tour not found');
    }

    if (tour.User._id.toString() !== user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }


    const facilitiesArray = req.body.facilities.map((facility , index) => {
        return facility.name
    })
    

    tour.name = req.body.name || tour.name;
    tour.city = req.body.city || tour.city;
    tour.description = req.body.description || tour.description;
    tour.price = req.body.price || tour.price;
    tour.duration = req.body.duration || tour.duration;
    tour.startDate = req.body.startDate || tour.startDate;
    tour.endDate = req.body.endDate || tour.endDate;
    tour.facilities = facilitiesArray

    const updatedTour = await tour.save();

    res.status(200).json(updatedTour);


 })