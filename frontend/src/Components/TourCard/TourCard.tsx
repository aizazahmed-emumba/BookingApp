import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import "./TourCard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import AlertDialog from "../AlertDialog";
import { useState } from "react";
import React from "react";

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

  const DeleteListner = async (id: any) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.delete(
        `http://localhost:5000/api/tour/${id}`,
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
      <Card sx={{ maxWidth: 345 }} className="Card w-96">
        <CardMedia
          component="img"
          className="object-cover h-40"
          alt="green iguana"
          height="140"
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>

          <div className="relative">
            <div className="flex flex-row mt-3 items-center justify-between CarddetailContainer h-12">
              <div className="flex items-center gap-3">
                <div className="bg-gray-300 rounded-full p-1 flex justify-center items-center">
                  <AttachMoneyOutlinedIcon className="text-gray-400" />
                </div>
                <Typography variant="body2" color="text.secondary">
                  ${price}
                </Typography>
              </div>
              <div className="flex items-center gap-1 ">
                {" "}
                <div className="bg-gray-300 rounded-full p-1 flex justify-center items-center">
                  <AccessTimeIcon className="text-gray-400" />
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
                  <button
                    data-testid="deleteButton"
                    onClick={() => {
                      DeleteListner(id);
                    }}
                  >
                    <DeleteOutlineOutlinedIcon
                      fontSize="large"
                      className="text-red-600"
                    />
                  </button>
                  <Link className="w-full" to={`/TourDetail/${id}`}>
                    <Button
                      className="w-full h-12"
                      variant="contained"
                      color="warning"
                      size="large"
                    >
                      details
                    </Button>
                  </Link>
                  <Link className="w-full" to={`/Tours/update/${id}`}>
                    <Button
                      className="w-full h-12"
                      variant="contained"
                      color="warning"
                      size="large"
                    >
                      Update
                    </Button>
                  </Link>
                </div>
              ) : (
                <Link className="w-full" to={`/TourDetail/${id}`}>
                  <Button
                    className="w-full h-12"
                    variant="contained"
                    color="warning"
                    size="large"
                  >
                    View Details
                  </Button>
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
    </>
  );
};

export default ImgMediaCard;
