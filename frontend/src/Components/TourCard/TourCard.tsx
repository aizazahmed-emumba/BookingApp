import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import "./TourCard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import AlertDialog from "../AlertDialog";
import { useState } from "react";
import React from "react";
import PriceIcon from "../../assets/PriceIcon";
import TimeIcon from "../../assets/TimeIcon";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog/DeleteConfirmationDialog";
import { CircularProgress } from "@mui/material";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface TourCardProps {
  title: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  owner: boolean;
  id: string;
}

const ImgMediaCard: React.FC<TourCardProps> = ({
  description,
  duration,
  image,
  owner,
  price,
  title,
  id,
}) => {
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const deleteListner = async (id: string) => {
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.delete(
        `${BACKEND_URL}/api/tour/${id}`,
        config
      );
      console.log(response);

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <>
      <Card
        sx={{ maxWidth: 400, borderRadius: 4, border: 0, boxShadow: 1 }}
        className="Card w-full"
      >
        <CardMedia
          component="img"
          className="object-cover h-56"
          alt="green iguana"
          height="192"
          image={image}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </Typography>

          <div className="relative">
            <div className="flex flex-row mt-1 items-center justify-between CarddetailContainer h-12">
              <div className="flex items-center gap-3">
                <div className=" flex justify-center items-center">
                  <PriceIcon />
                </div>
                <Typography variant="body2" color="text.secondary">
                  ${price} - ${price + 200}
                </Typography>
              </div>
              <div className="flex items-center gap-1 ">
                {" "}
                <div className=" flex justify-center items-center">
                  <TimeIcon />
                </div>
                <Typography variant="body2" color="text.secondary">
                  {duration} Day
                </Typography>
              </div>
              <div></div>
            </div>
            <div className="CardButtonContainer absolute inset-0 flex items-center justify-center z-10">
              {owner ? (
                <div className="w-full  gap-5 flex justify-center items-center">
                  {!loading ? (
                    <button
                      data-testid="deleteButton"
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      <DeleteOutlineOutlinedIcon
                        fontSize="large"
                        className="text-red-600"
                      />
                    </button>
                  ) : (
                    <CircularProgress size={"20px"} />
                  )}
                  <Link className="w-full" to={`/TourDetail/${id}`}>
                    <button
                      type="button"
                      className="text-white w-full h-full bg-primary  focus:ring- font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    >
                      details
                    </button>
                  </Link>
                  <Link className="w-full" to={`/Tours/update/${id}`}>
                    {" "}
                    <button
                      type="button"
                      className="text-white w-full h-full bg-primary  focus:ring- font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    >
                      Update
                    </button>
                  </Link>
                </div>
              ) : (
                <Link className="w-full" to={`/TourDetail/${id}`}>
                  <button
                    type="button"
                    className="text-white w-full h-12 bg-primary  focus:ring- font-medium rounded-lg text-sm px-5 py-2.5 "
                  >
                    View Details
                  </button>
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <AlertDialog
        open={error}
        handleClose={() => {
          setError(false);
        }}
      />
      <DeleteConfirmationDialog
        open={open}
        setOpen={setOpen}
        id={id}
        deleteListner={deleteListner}
        title={title}
      />
    </>
  );
};

export default ImgMediaCard;
