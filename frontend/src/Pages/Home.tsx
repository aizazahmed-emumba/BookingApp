import React from "react";
import Filters from "../Components/Filters";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const cities = [
    "Istanbul",
    "Dubai",
    "Miami",
    "Chicago",
    "Dallas",
    "Havana",
    "Berlin",
    "London",
    "Ankara",
    "Orlando",
    "Cape Town",
    "Santroni",
    "Madrid",
    "Lisbon",
    "New Orleans",
  ];

  return (
    <div className="min-h-screen">
      <div className="md:p-10 py-32 min-h-[70vh] HomeBackgroundImage flex justify-center items-end">
        <Filters />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mt-10">Popular Search</h1>
        <div className="flex justify-evenly items-center flex-wrap flex-1 mt-8 gap-10 max-w-[60%] mb-20">
          {cities.map((city, index) => (
            <Link
              key={index}
              to={`/Tours?location=${city}`}
              className="p-2 rounded-xl border border-[#E1E1E1] text-[#797C9A]"
            >
              {city}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
