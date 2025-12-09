import BookingList from "./components/BookingList";
import { useEffect, useState } from "react";
import { Reserva } from "@/shared/types/db/reserva";

const ViewBookingTab = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

  const [bookings, setBookings] = useState<Reserva[]>([]);
  async function getBookinsData() {
    try {
      let url = `${API_BASE_URL}/api/bookings/`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (res.status === 200) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getBookinsData();
  }, []);

  return (
    <div className="space-y-5">
      <h2 className="font-bold">Gestion de reservas</h2>

      <BookingList
        bookings={bookings}
      />

    </div>
  );
}

export default ViewBookingTab;