import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DetailCard from "../Components/DetailCard/DetailCard";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import BookingResultTable from "../Components/BookingResultTable/BookingResultTable";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const TourDetail: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [Tour, setTour] = React.useState<any>({});
  const [Booking, setBooking] = React.useState<any>([]);

  const Description = `The Pérez Art Museum Miami —officially known as the Jorge M Pérez Art Museum of Miami-Dade County—is a contemporary art museum that relocated in 2013 to the Museum Park in Downtown Miami, Florida. Founded in 1984 as the Center for the Fine Arts, it became known as the Miami Art Museum from 1996 until it was renamed in 2013 upon the opening its new building designed by Herzog & de Meuron at 1103 Biscayne Boulevard. PAMM, along with the $275 million Phillip and Patricia Frost Museum of Science and a city park which are being built in the area with completion in 2017, is part of the 20-acre Museum Park.`;

  const Lines = Description.split(".");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/tour/${id}`);
        console.log(response.data);
        setTour(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          `${BACKEND_URL}/api/booking/getTourBooking/${id}`,
          config
        );
        console.log(response.data);
        setBooking(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    console.log(Booking);

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full justify-center items-center flex">
        <CircularProgress size={"100px"} />
      </div>
    );
  }

  return (
    <div className="p-10 py-24">
      <div className=" w-full flex flex-row items-center justify-between">
        <h1 className="font-bold text-3xl">
          {Tour && `Top Destinations At "${Tour?.name}"`}
        </h1>
        <div></div>
      </div>

      <div className="flex mt-5 items-center justify-start gap-5">
        <div className="flex items-center gap-3">
          <div className="bg-gray-300 text-sm rounded-full p-1 flex justify-center items-center">
            <LocationOnOutlinedIcon
              fontSize="inherit"
              className="text-gray-400"
            />
          </div>
          <Typography variant="body2" color="text.secondary">
            {Tour?.city}
          </Typography>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-gray-300 text-sm rounded-full p-1 flex justify-center items-center">
            <AttachMoneyOutlinedIcon
              fontSize="inherit"
              className="text-gray-400"
            />
          </div>
          <Typography variant="body2" color="text.secondary">
            ${Tour?.price}
          </Typography>
        </div>
        <div className="flex items-center gap-1 ">
          {" "}
          <div className="bg-gray-300 text-sm rounded-full p-1 flex justify-center items-center">
            <AccessTimeIcon fontSize="inherit" className="text-gray-400" />
          </div>
          <Typography variant="body2" color="text.secondary">
            {Tour?.duration} Days
          </Typography>
        </div>
        <div></div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-10">
        <div className="w-full h-[27rem] rounded-lg overflow-hidden">
          {" "}
          <img
            src={Tour.image}
            alt="Miami"
            className="w-full h-full object-cover overflow-hidden rounded-3xl hover:scale-105 transition duration-300 ease-in-out"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 ">
          <div className="w-full h-52 overflow-hidden">
            <img
              src="../../public/Miami.webp"
              alt="Miami"
              className="w-full h-full object-cover overflow-hidden rounded-3xl hover:scale-105 transition duration-300 ease-in-out"
            />
          </div>
          <div className="w-full h-52 overflow-hidden ">
            {" "}
            <img
              src="../../public/Miami2.webp"
              alt="Miami"
              className="w-full h-full object-cover overflow-hidden rounded-3xl hover:scale-105 transition duration-300 ease-in-out"
            />
          </div>
          <div className="w-full h-52 overflow-hidden ">
            {" "}
            <img
              src="../../public/Miami3.jpg"
              alt="Miami"
              className="w-full h-full object-cover overflow-hidden rounded-3xl hover:scale-105 transition duration-300 ease-in-out"
            />
          </div>
          <div className="w-full h-52  overflow-hidden">
            {" "}
            <img
              src="../../public/Miami5.jpg"
              alt="Miami"
              className="w-full h-full object-cover overflow-hidden rounded-3xl hover:scale-105 transition duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="mt-10 px-10 text-center flex flex-col gap-5">
        {Lines.map((line, index) => {
          return (
            <Typography variant="body1" key={index} className="mb-10">
              {line}
            </Typography>
          );
        })}
      </div>
      <div className="">
        <h1 className="text-4xl font-bold">What's Included</h1>
        <div className="p-2 mt-5">
          <div className="flex justify-between pb-6 items-center border-b border-black text-lg font-bold">
            <div className="w-full px-20  ">
              <p>Destination</p>
            </div>
            <div className="w-full font-normal">
              <p>{Tour?.city}</p>
            </div>
          </div>
          <div className="flex justify-between pb-6 items-center border-b border-black text-lg font-bold mt-5">
            <div className="w-full px-20  ">
              <p>Departure Location</p>
            </div>
            <div className="w-full font-normal">
              <p>Street 58 Block D {Tour?.city}</p>
            </div>
          </div>
          <div className="flex justify-between pb-6 items-center border-b border-black text-lg font-bold mt-5">
            <div className="w-full px-20  ">
              <p>Return</p>
            </div>
            <div className="w-full font-normal">
              <p>7:00 PM on Day {Tour?.Durations}</p>
            </div>
          </div>
          <div className="flex justify-between pb-6 items-center border-b border-black text-lg font-bold mt-5">
            <div className="w-[70%] px-20  ">
              <p>Benefits</p>
            </div>
            <div className="w-full font-normal grid grid-cols-2 gap-y-2">
              <div className="flex justify-start items-center">
                <CheckCircleIcon
                  fontSize="small"
                  className="text-green-500 mr-2"
                />
                <p>Basic first aid kit</p>
              </div>{" "}
              <div className="flex justify-start items-center">
                <CheckCircleIcon
                  fontSize="small"
                  className="text-green-500 mr-2"
                />
                <p>Comfortable Private Booked Transport</p>
              </div>{" "}
              <div className="flex justify-start items-center">
                <CheckCircleIcon
                  fontSize="small"
                  className="text-green-500 mr-2"
                />
                <p>Fule Expense</p>
              </div>{" "}
              <div className="flex justify-start items-center">
                <CheckCircleIcon
                  fontSize="small"
                  className="text-green-500 mr-2"
                />
                <p>Mess Tent, Kitchen Utensils, and Cook</p>
              </div>{" "}
              <div className="flex justify-start items-center">
                <CheckCircleIcon
                  fontSize="small"
                  className="text-green-500 mr-2"
                />
                <p>Detail Guided Maps</p>
              </div>{" "}
              <div className="flex justify-start items-center">
                <CheckCircleIcon
                  fontSize="small"
                  className="text-green-500 mr-2"
                />
                <p>Waterproof Tents on twin Sharing</p>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-4xl font-bold">Itinerary Schedule</h1>
        <div className="p-1 mt-5 flex justify-between items-center gap-5">
          {Array.from({ length: Tour.duration }, (_, i) => (
            <DetailCard
              day={i + 1}
              date={Tour.startDate}
              key={i}
              city={Tour.city}
            />
          ))}
        </div>

        <div className="mt-10 text-2xl font-bold">
          {Booking.length > 0 ? (
            <>
              <h1>Total Bookings: {Booking.length}</h1>
              <div className="mt-10">
                <BookingResultTable Bookings={Booking} />
              </div>
            </>
          ) : (
            <div />
          )}
        </div>

        <div className="w-full flex justify-center items-center">
          <Link
            to={`/BookTour/${Tour?._id}`}
            className="bg-[#F16B51] text-white p-3 rounded-lg w-1/4 text-center mt-10"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
