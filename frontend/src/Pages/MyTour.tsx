import React, { useEffect } from "react";
import TourCard from "../Components/TourCard/TourCard";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MyTour: React.FC = () => {
  const [tours, setTours] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };

        const response = await axios.get(
          `${BACKEND_URL}/api/tour/getMyTours`,
          config
        );
        console.log(response.data);
        setTours(response.data);
      } catch (error: any) {
        if (error.response.status === 401) {
          navigate("/login?redirect=/MyTours");
        } else {
          toast.error("Something went wrong");
        }

        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full justify-center items-center flex">
        <CircularProgress size={"100px"} />
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <div className="h-screen w-full justify-center items-center flex">
        <h1 className="text-2xl font-bold">No Tours Found</h1>
      </div>
    );
  }

  return (
    <div className="p-10 py-24 ">
      <div className=" w-full flex flex-row items-center justify-between">
        <h1 className="font-bold text-3xl">My Tours</h1>
        <div></div>
      </div>
      <div className="grid grid-cols-3 place-items-center gap-5 mt-10">
        {tours.map((tour: any) => (
          <TourCard
            title={tour.name}
            description={tour.description}
            duration={tour.duration}
            image={tour.image}
            owner={true}
            price={tour.price}
            key={tour._id}
            id={tour._id}
          />
        ))}
      </div>
    </div>
  );
};

export default MyTour;
