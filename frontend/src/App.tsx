import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Navbar from "./Components/Navbar/Navbar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Tours from "./Pages/Tours";
import TourDetail from "./Pages/TourDetail";
import BookTour from "./Pages/BookTour";
import Login from "./Pages/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserData } from "./Slices/userSlice";
import AddTour from "./Pages/AddTour";
import MyTour from "./Pages/MyTour";
import UpdateTour from "./Pages/UpdateTour";
import { Toaster } from "react-hot-toast";

function App() {
  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(fetchUserData());
  }, []);

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Tours" element={<Tours />} />
          <Route path="/TourDetail/:id" element={<TourDetail />} />
          <Route path="/BookTour/:id" element={<BookTour />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="AddTour" element={<AddTour />} />
          <Route path="MyTours" element={<MyTour />} />
          <Route path="Tours/update/:id" element={<UpdateTour />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </LocalizationProvider>
      <div>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
