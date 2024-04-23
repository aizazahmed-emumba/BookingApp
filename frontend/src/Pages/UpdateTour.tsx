import React from "react";
import UpdateTourForm from "../Components/UpdateTourForm/UpdateTourForm";
import { useParams } from "react-router-dom";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const UpdateTour: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = React.useState(true);
  const [tour, setTour] = React.useState<any>({});

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const congif = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };

        const response = await axios.get(
          `${BACKEND_URL}/api/tour/${id}`,
          congif
        );
        setTour(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!tour) {
    return <h1>Tour not found</h1>;
  }

  return (
    <div>
      <div className="p-10 py-24 grid grid-cols-2 min-h-screen">
        <div>
          <h1 className="font-bold text-3xl">Update Tour</h1>
          <div className="mt-10 px-10">
            {tour && (
              <UpdateTourForm
                id={id!}
                city={tour.city}
                description={tour.description}
                duration={tour.duration}
                endDate={tour.endDate}
                startDate={tour.startDate}
                price={tour.price}
                name={tour.name}
                facilitiesInitialValues={tour.facilities}
              />
            )}
          </div>
        </div>
        <div>
          <img
            src="/public/miami-city.jpg"
            alt="Miami City"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateTour;
