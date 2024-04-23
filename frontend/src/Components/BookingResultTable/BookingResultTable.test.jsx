import React from "react";
import { render } from "@testing-library/react";
import BasicTable from "./BookingResultTable";

describe("BasicTable", () => {
  test("renders table with booking data", () => {
    const bookings = [
      {
        name: "John Doe",
        email: "john@example.com",
        numOfAdults: 1,
        numOfChilds: 2,
        paymentMethod: "Credit Card",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        numOfAdults: 3,
        numOfChilds: 4,
        paymentMethod: "PayPal",
      },
    ];

    const { getByRole, getByText } = render(<BasicTable Bookings={bookings} />);


    const tableContainer = getByRole("table");
    expect(tableContainer).toBeInTheDocument();


    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Email")).toBeInTheDocument();
    expect(getByText("No of Adults")).toBeInTheDocument();
    expect(getByText("No of Children")).toBeInTheDocument();
    expect(getByText("Payment Method")).toBeInTheDocument();

    bookings.forEach((booking) => {
      expect(getByText(booking.name)).toBeInTheDocument();
      expect(getByText(booking.email)).toBeInTheDocument();
      expect(getByText(String(booking.numOfAdults))).toBeInTheDocument();
      expect(getByText(String(booking.numOfChilds))).toBeInTheDocument();
      expect(getByText(booking.paymentMethod)).toBeInTheDocument();
    });
  });
});
