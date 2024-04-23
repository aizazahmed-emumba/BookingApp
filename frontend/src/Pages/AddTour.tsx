import React from "react";
import AddTourForm from "../Components/AddTourForm/AddTourForm";

const AddTour: React.FC = () => {
  return (
    <div>
      <div className="p-10 py-24 grid grid-cols-2 min-h-screen">
        <div>
          <h1 className="font-bold text-3xl">Add a Tour</h1>
          <div className="mt-10 px-10">
            <AddTourForm />
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
    </div>
  );
};

export default AddTour;
