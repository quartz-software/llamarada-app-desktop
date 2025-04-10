import Input from "../common/components/Input";
import CardRoom from "../bookings/components/CardRoom";

import { useEffect, useState } from "react";

import "./Index.css";
import FormField from "../common/components/FormField";

const Habitaciones = () => {
  const [roomsData, setRoomsData] = useState<Room[]>([]);
  const [search, setSearch] = useState({
    text: "",
    dateIn: "",
    // new Date().toISOString().split('T')[0]
    dateOut: ""
  });

  function getData() {
    let url = "/api/rooms";
    let cont = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, cont)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }
      })
      .then((data) => {
        setRoomsData(data);
      })
      .catch((error) => {
        console.error(error.toString());
      });
  }
  function changeStatus(room: Room) {
    room.status = "available"
    return room
  }

  function fileterRooms(search: { text: string, dateIn: string, dateOut: string }, arr: Room[]) {
    if (search.dateIn == "" || search.dateOut == "") return arr

    const checkInDate = new Date(search.dateIn)
    const checkOutDate = new Date(search.dateOut)
    let considences = arr.filter((room) => {
      return room.bookings.every((booking) => {
        const bookingCheckIn = new Date(booking.checkIn);
        const bookingCheckOut = new Date(booking.checkOut);

        return checkOutDate <= bookingCheckIn || checkInDate >= bookingCheckOut;
      })
    })
    console.log(considences);

    return considences


  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Reservaciones</h1>
      <h3>Filtros</h3>
      <div className="div--filter">
        <FormField label="Buscar" errorMessage="">
          <Input
            placeholder="Buscar"
            type="text"
            resetMessage={() => { }}
            value={search.text}
            handleInput={(value: string) => {
              console.log(value);
            }} />
        </FormField>
        <FormField label="CheckIn" errorMessage="">
          <Input
            placeholder="CheckIn"
            type="date"
            resetMessage={() => { }}
            value={search.dateIn}
            handleInput={(value: string) => {
              setSearch({ ...search, dateIn: value })
            }} />
        </FormField>
        <FormField label="CheckOut" errorMessage="">
          <Input
            placeholder="CheckOut"
            type="date"
            resetMessage={() => { }}
            value={search.dateOut}
            handleInput={(value: string) => {
              setSearch({ ...search, dateOut: value })
            }} />
        </FormField>
      </div>
      <div className="content--rooms">
        {fileterRooms(search, roomsData).map((room, index) => {
          return (
            <CardRoom key={index} room={
              search.dateIn == "" || search.dateOut == "" ?
                room :
                changeStatus(room)
            } />
          )
        })}
      </div>
    </div>
  );
};

export default Habitaciones;
