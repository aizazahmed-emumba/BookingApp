import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    facilities: [{ type: String, required: true }],
    User : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image : {
      type: String,
      required: true
    }
  }, {
    timestamps: true,
  });

  export const Tour = mongoose.model('Tour', tourSchema);