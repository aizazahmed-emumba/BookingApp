import React, { useEffect } from "react";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import axios from "axios";
import toast from "react-hot-toast";

type DetailCardProps = {
  day: number;
  date: string;
  city: string;
};

const DetailCard: React.FC<DetailCardProps> = ({ day, city }) => {
  const [temp, setTemp] = React.useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=78977841b3829c21e9d4690fad98d74d`
        );

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=78977841b3829c21e9d4690fad98d74d&units=metric`
        );
        setTemp(response.data.main.temp);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch weather data");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 shadow-lg rounded-lg border border-gray-200 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Day {day}</h2>
        <div className="flex justify-center items-center gap-2">
          <WbSunnyOutlinedIcon />
          <div>
            <p className="text-lg font-bold">{temp}°C</p>
          </div>
        </div>
      </div>
      <div className="p-5">
        <ul className="list-disc ml-4 font-semibold space-y-2">
          <li>Departure from Islamabad</li>
          <li>Arrival at Murree</li>
          <li>Check-in at Hotel</li>
          <li>Visit to Mall Road</li>
          <li>Dinner at Hotel</li>
        </ul>
      </div>
    </div>
  );
};

export default DetailCard;
