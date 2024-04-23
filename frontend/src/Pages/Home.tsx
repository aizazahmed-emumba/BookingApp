import React, { useState } from "react";
import AddLocationOutlinedIcon from "@mui/icons-material/AddLocationOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { DateCalendar } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import AutoCompleteLocation from "../Components/AutoComplete/AutoCompleteLocation";
import { Result } from "../Components/AutoComplete/AutoCompleteLocation";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [dateTo, setDateTo] = useState<Dayjs | null>(null);
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
  const [priceRange, setPriceRange] = useState<number>(0);
  const [show, setshow] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<Result | null>(null);

  console.log(import.meta.env.VITE_BACKEND_URL);

  const HandlePrice = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setPriceRange(parseInt(e.currentTarget.value));
  };

  const navigate = useNavigate();

  const HandleSearch = () => {
    let queryParams = "";

    if (selectedLocation) {
      queryParams += `location=${selectedLocation.name}&`;
    }
    if (dateFrom) {
      queryParams += `dateFrom=${dateFrom.format("YYYY-MM-DD")}&`;
    }
    if (dateTo) {
      queryParams += `dateTo=${dateTo.format("YYYY-MM-DD")}&`;
    }
    if (priceRange) {
      queryParams += `priceRange=${priceRange}&`;
    }

    navigate(`/Tours?${queryParams}`);
  };

  return (
    <div className="min-h-screen p-20 HomeBackgroundImage flex justify-center items-center">
      <div
        onMouseLeave={() => {
          setshow("");
        }}
        className="bg-white flex flex-row items-center justify-around min-h-36 w-2/3 rounded-lg relative"
      >
        <div className="flex flex-row p-7 gap-3">
          <AddLocationOutlinedIcon />
          <div
            onClick={() => {
              setshow("location");
            }}
            className=" flex flex-col gap-2"
          >
            <h2>Location</h2>
            <div className="text-gray-400">
              {selectedLocation?.name
                ? selectedLocation.name
                : "Where you want to go?"}
            </div>
          </div>
        </div>
        <div className="flex border-x-2 flex-row p-7 gap-3">
          <CalendarMonthOutlinedIcon />
          <div className=" flex flex-col gap-2">
            <h2>Choose Date</h2>
            <div
              onClick={() => {
                setshow("date");
              }}
              className="flex"
            >
              <div className="text-gray-400">
                {!dateTo || !dateFrom
                  ? "Choose Here"
                  : dateFrom.format("LL") + " - " + dateTo.format("LL")}
              </div>
              <KeyboardArrowUpIcon className="text-gray-400" />
            </div>
          </div>
        </div>{" "}
        <div className="flex flex-row p-7 gap-3">
          <div className="">
            <div className="bg-gray-300 rounded-full p-1 flex justify-center items-center">
              <AttachMoneyOutlinedIcon className="text-white" />
            </div>
          </div>
          <div className=" flex flex-col gap-2">
            <h2>Price Range</h2>
            <div
              onClick={() => {
                setshow("price");
              }}
              className="flex"
            >
              <div className="text-gray-400">
                {priceRange === 0 ? "Choose Here" : "Above " + priceRange}{" "}
              </div>
              <KeyboardArrowUpIcon className="text-gray-400" />
            </div>
          </div>
        </div>
        <button
          onClick={HandleSearch}
          type="button"
          disabled={
            priceRange || (dateFrom && dateTo) || selectedLocation
              ? false
              : true
          }
          className={`${
            priceRange || (dateFrom && dateTo) || selectedLocation
              ? "bg-[#F16B51]"
              : "bg-[#e6aa9e]"
          } h-16 rounded-lg flex justify-center items-center w-12`}
        >
          <SearchOutlinedIcon className="text-white" />
        </button>
        {show === "location" && (
          <div className="absolute top-2/3 right-2/3 bg-white w-80 h-80 rounded-lg shadow-2xl flex flex-col gap-4 p-4">
            <div className="flex flex-row gap-2">
              <AutoCompleteLocation
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
              />
            </div>
          </div>
        )}
        {show === "date" && (
          <>
            <div className="absolute top-3/4 flex flex-row gap-1">
              <div className="bg-white w-80 h-80 rounded-lg shadow-2xl flex flex-col gap-4 p-4">
                <DateCalendar
                  value={dateFrom}
                  onChange={(newValue) => {
                    setDateFrom(newValue);
                    setDateTo(newValue);
                  }}
                />
              </div>
              <div className="bg-white w-80 h-80 rounded-lg shadow-2xl flex flex-col gap-4 p-4">
                <DateCalendar
                  value={dateTo}
                  disablePast
                  onChange={(newValue) => {
                    setDateTo(newValue);
                    setshow("");
                  }}
                />
              </div>
            </div>
          </>
        )}
        {show === "price" && (
          <div className="absolute top-3/4 left-3/4 flex flex-col gap-2 bg-white w-44 rounded-xl items-start  shadow-2xl border border-gray-200 ">
            <button
              onClick={HandlePrice}
              value={50}
              className="hover:bg-pink-200 w-full p-3"
            >
              $50 - $200
            </button>
            <button
              onClick={HandlePrice}
              value={200}
              className="hover:bg-pink-200 w-full p-3"
            >
              $200 - $400
            </button>
            <button
              onClick={HandlePrice}
              value={400}
              className="hover:bg-pink-200 w-full p-3"
            >
              $400 - $600
            </button>
            <button
              onClick={HandlePrice}
              value={600}
              className="hover:bg-pink-200 w-full p-3"
            >
              $600 - $800
            </button>
            <button
              onClick={HandlePrice}
              value={1000}
              className="hover:bg-pink-200 w-full p-3"
            >
              $1000 above
            </button>
          </div>
        )}
      </div>

      <div></div>
    </div>
  );
};

export default Home;
