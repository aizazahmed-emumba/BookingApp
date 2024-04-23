import React from "react";
import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import DetailCard from "./DetailCard";
import { toast } from "react-hot-toast";

jest.mock("axios");
jest.mock('react-hot-toast');


describe("DetailCard", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    
        toast.error = jest.fn();
      });

  test("fetches and displays temperature data correctly", async () => {
    const mockData = {
      data: [
        {
          lat: 33.6844,
          lon: 73.0479,
        },
      ],
    };

    const mockWeatherResponse = {
      data: {
        main: {
          temp: 20,
        },
      },
    };

    axios.get.mockResolvedValueOnce(mockData);
    axios.get.mockResolvedValueOnce(mockWeatherResponse);

    const { getByText } = render(<DetailCard day={1} city="Islamabad" />);

    await waitFor(() => {
      expect(getByText("20°C")).toBeInTheDocument();
    });


    expect(axios.get).toHaveBeenCalledWith(
      "http://api.openweathermap.org/geo/1.0/direct?q=Islamabad&limit=5&appid=78977841b3829c21e9d4690fad98d74d"
    );

    expect(axios.get).toHaveBeenCalledWith(
      "https://api.openweathermap.org/data/2.5/weather?lat=33.6844&lon=73.0479&appid=78977841b3829c21e9d4690fad98d74d&units=metric"
    );


    expect(toast.error).not.toHaveBeenCalled();
  });

  test("handles error when fetching weather data fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("Request failed"));

    const { getByText } = render(<DetailCard day={1} city="Islamabad" />);


    await waitFor(() => {

        expect(toast.error).toHaveBeenCalledTimes(1);
    });

  });
});
