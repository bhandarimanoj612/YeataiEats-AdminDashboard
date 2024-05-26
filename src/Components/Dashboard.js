import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";
const Dashboard = () => {
  const [bookingList, setBookingList] = useState([]);
  const [bookingData, setBookingData] = useState({});

  useEffect(() => {
    fetchBookingData();
  }, []);

  const fetchBookingData = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7102/api/Order/email/aryanDhamala@gmail.com"
      );
      const data = response.data;
      setBookingList(data);

      const userBookings = {};
      data.forEach((booking) => {
        const { userName, totalPrice } = booking;
        if (userBookings[userName]) {
          userBookings[userName].totalBookings++;
          userBookings[userName].totalPrice += totalPrice;
        } else {
          userBookings[userName] = {
            totalBookings: 1,
            totalPrice: totalPrice,
          };
        }
      });
      setBookingData(userBookings);
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  return (
    <div>
      <Header />
      <h1>Booking List</h1>
      <ul>
        {bookingList.map((booking) => (
          <li key={booking.id}>
            User: {booking.userName}, Item: {booking.itemName}, Quantity:{" "}
            {booking.quantity}
          </li>
        ))}
      </ul>
      <PieChart
        data={[
          { title: "One", value: 10, color: "#E38627" },
          { title: "Two", value: 15, color: "#C13C37" },
          { title: "Three", value: 20, color: "#6A2135" },
        ]}
        radius={10} // Adjust the radius value to make the pie chart smaller
      />
      ;
      <Footer />
    </div>
  );
};

export default Dashboard;
