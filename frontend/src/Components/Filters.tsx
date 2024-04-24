import React from "react";
import LocationIcon from "../assets/LocationIcon";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { DateCalendar } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import { Dayjs } from "dayjs";
import AutoCompleteLocation, {
  Result,
} from "./AutoComplete/AutoCompleteLocation";
import CalanderIcon from "../assets/CalanderIcon";
import PriceIcon from "../assets/PriceIcon";
import ArrowUp from "../assets/ArrowUp";

const Filters: React.FC = () => {
  const [show, setShow] = React.useState<string>("");
  const [dateTo, setDateTo] = React.useState<Dayjs | null>(null);
  const [dateFrom, setDateFrom] = React.useState<Dayjs | null>(null);
  const [priceRange, setPriceRange] = React.useState<number>(0);
  const [selectedLocation, setSelectedLocation] = React.useState<Result | null>(
    null
  );

  const HandlePrice = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setPriceRange(parseInt(e.currentTarget.value));
  };

  const navigate = useNavigate();

  const handleSearch = () => {
    let queryParams = "";
    // queryParams.append("location", selectedLocation?.name);

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

  //   const componentRef = useRef<HTMLDivElement>(null);

  //   useEffect(() => {
  //     // Add event listener to detect clicks outside of the component
  //     const handleClickOutside = (event: MouseEvent) => {
  //       if (
  //         componentRef.current &&
  //         !componentRef.current.contains(event.target as Node)
  //       ) {
  //         // Click occurred outside of the component, so hide it
  //         setShow("");
  //       }
  //     };

  //     // Bind the event listener
  //     document.addEventListener("mousedown", handleClickOutside);

  //     // Cleanup function to remove the event listener when component unmounts
  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, []);

  return (
    <div
      className="bg-white flex md:flex-row flex-col flex-wrap md:items-center md:justify-around items-start justify-center  md:min-h-36 md:w-2/3 rounded-lg relative"
      onMouseLeave={() => {
        setShow("");
      }}
      //   ref={componentRef}
    >
      <div className="flex flex-row p-7 gap-3">
        <LocationIcon />
        <div
          onClick={() => {
            setShow("location");
          }}
          className=" flex flex-col gap-2"
        >
          <h2 className="font-bold">Location</h2>
          <div className="text-gray-400">
            {selectedLocation?.name
              ? selectedLocation.name
              : "Where you want to go?"}
          </div>
        </div>
      </div>
      <div className="flex md:border-x-2 flex-row p-7 gap-3">
        <CalanderIcon />
        <div className=" flex flex-col gap-2">
          <h2 className=" font-bold ">Choose Date</h2>
          <div
            onClick={() => {
              setShow("date");
            }}
            className="flex justify-center items-center gap-2"
          >
            <div className="text-gray-400">
              {!dateTo || !dateFrom
                ? "Choose Here"
                : dateFrom.format("LL") + " - " + dateTo.format("LL")}
            </div>
            <ArrowUp />
          </div>
        </div>
      </div>{" "}
      <div className="flex flex-row p-7 gap-3">
        <div className="">
          <div className=" p-1 flex justify-center items-center">
            <PriceIcon />
          </div>
        </div>
        <div className=" flex flex-col gap-2">
          <h2 className="font-bold">Price Range</h2>
          <div
            onClick={() => {
              setShow("price");
            }}
            className="flex justify-center items-center gap-2"
          >
            <div className="text-gray-400">
              {priceRange === 0 ? "Choose Here" : "Above " + priceRange}{" "}
            </div>
            <ArrowUp />
          </div>
        </div>
      </div>
      <button
        onClick={handleSearch}
        type="button"
        disabled={
          priceRange || (dateFrom && dateTo) || selectedLocation ? false : true
        }
        className={`${
          priceRange || (dateFrom && dateTo) || selectedLocation
            ? "bg-primary"
            : "bg-[#e6aa9e]"
        } h-16 rounded-lg flex justify-center items-center md:w-12 w-[80%] self-center mb-2 mr-2`}
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
          <div className="absolute top-3/4 flex flex-row shadow-2xl">
            <div className="bg-white w-80 h-80 rounded-lg flex flex-col gap-4 p-4">
              <DateCalendar
                value={dateFrom}
                onChange={(newValue) => {
                  setDateFrom(newValue);
                  setDateTo(newValue);
                }}
              />
            </div>
            <div className="bg-white w-80 h-80 rounded-lg flex flex-col gap-4 p-4">
              <DateCalendar
                value={dateTo}
                disablePast
                onChange={(newValue) => {
                  setDateTo(newValue);
                  setShow("");
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
  );
};

export default Filters;
