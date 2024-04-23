import React from "react";
import BookingForm from "../Components/BookingForm/BookingForm";
const BookTour: React.FC = () => {
  return (
    <div className="p-10 py-24 grid grid-cols-2 min-h-screen">
      <div>
        <h1 className="font-bold text-3xl">Confirm Your Booking</h1>
        <div className="mt-10 px-10">
          <BookingForm />
        </div>
      </div>
      <div>
        <img
          src="/miami-city.jpg"
          alt="Miami City"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default BookTour;
