import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TourCard from "../Components/TourCard/TourCard";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { Button } from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Tours: React.FC = () => {
  const [searchParams] = useSearchParams();

  const location = searchParams.get("location");
  console.log(searchParams.get("dateFrom"));
  console.log(searchParams.get("dateTo"));
  console.log(searchParams.get("priceRange"));

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/tour`, {
          params: {
            location: searchParams.get("location"),
            dateFrom: searchParams.get("dateFrom"),
            dateTo: searchParams.get("dateTo"),
            priceRange: searchParams.get("priceRange"),
          },
        });
        console.log(response.data);
        setTours(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    searchParams.get("location"),
    searchParams.get("dateFrom"),
    searchParams.get("dateTo"),
    searchParams.get("priceRange"),
  ]);

  if (loading) {
    return (
      <div className="h-screen w-full justify-center items-center flex">
        <CircularProgress size={"100px"} />
      </div>
    );
  }

  if (tours.length === 0)
    return (
      <div className="h-screen w-full justify-center items-center flex">
        <h1 className="font-bold text-3xl">No Tours Found</h1>
      </div>
    );

  return (
    <div className="p-10 py-24 ">
      <div className=" w-full flex flex-row items-center justify-between">
        <h1 className="font-bold text-3xl">
          {location && `Top Destinations At "${searchParams.get("location")}"`}
        </h1>
        <Button
          variant="outlined"
          className="flex gap-2 justify-center items-center"
          size="small"
          style={{ borderColor: "#D3D3D3", color: "#000", fontWeight: 600 }}
        >
          <FilterListOutlinedIcon />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-3 place-items-center gap-5 mt-10">
        {tours.map((tour: any) => (
          <TourCard
            title={tour.name}
            description={tour.description}
            duration={tour.duration}
            image={tour.image}
            owner={false}
            price={tour.price}
            key={tour._id}
            id={tour._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Tours;
