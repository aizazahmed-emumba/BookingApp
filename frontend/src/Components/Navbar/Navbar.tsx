import React from "react";
import Logo from "../../assets/logo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import axios from "axios";
import { clearUser } from "../../Slices/userSlice";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const Dispatch = useDispatch();
  const HandleLogout = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.post(
        `${BACKEND_URL}/api/user/logout`,
        {},
        config
      );
      console.log(response);
      Dispatch(clearUser());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="absolute bg-transparent w-full px-10 py-5 justify-between items-center flex flex-row">
      <div>
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>
      <div className="flex flex-row gap-10 justify-between items-center">
        <Link className="font-semibold" to={"/Tours"}>
          Tours
        </Link>
        <Link className="font-semibold" to={"/AddTour"}>
          Add Tour
        </Link>
        <Link className="font-semibold" to={"/MyTours"}>
          My Tours
        </Link>
      </div>
      {user._id ? (
        <div>
          <button className="font-semibold" onClick={HandleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Navbar;
