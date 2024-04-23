import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: false,
    },
    numOfAdults: {
      type: Number,
      required: true,
    },
    numOfChilds: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
  },{
    timestamps: true,
    
  });

    export const Booking = mongoose.model('Booking', bookingSchema);