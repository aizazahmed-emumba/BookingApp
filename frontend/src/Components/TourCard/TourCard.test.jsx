import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ImgMediaCard from "./TourCard";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");

describe("ImgMediaCard", () => {

  beforeEach(() => {
    axios.delete.mockClear();
  });

  const mockProps = {
    description: "Test description",
    duration: 5,
    image: "test.jpg",
    owner: true,
    price: 100,
    title: "Test title",
    id: "123",
  };

  test("renders card with correct data", () => {
    const { getByText } = render(
    <MemoryRouter>
        <ImgMediaCard {...mockProps} />
    </MemoryRouter>
);
    expect(getByText(mockProps.title)).toBeInTheDocument();
    expect(getByText(mockProps.description)).toBeInTheDocument();
    expect(getByText(`$${mockProps.price}`)).toBeInTheDocument();
    expect(getByText(`${mockProps.duration} Day`)).toBeInTheDocument();
  });

  test("deletes tour when delete button is clicked", async () => {
    axios.delete.mockResolvedValueOnce({ status: 200 });

    const {  getByTestId } = render(  
        <MemoryRouter>
            <ImgMediaCard {...mockProps} />
        </MemoryRouter>);

    // Click the delete button
    fireEvent.click(getByTestId("deleteButton"));

    // Wait for the axios request to resolve
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledTimes(1);
      expect(axios.delete).toHaveBeenCalledWith(
        `http://localhost:5000/api/tour/${mockProps.id}`,
        expect.any(Object) // This checks that the config object is passed
      );
    });
  });

    test("does not show delete button when owner is false", () => {
        const { queryByTestId } = render(
        <MemoryRouter>
            <ImgMediaCard {...mockProps} owner={false} />
        </MemoryRouter>
        );
    
        expect(queryByTestId("deleteButton")).not.toBeInTheDocument();
    });
});
