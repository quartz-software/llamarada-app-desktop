import { useLocation, useNavigate } from "react-router-dom";
import Button from "../common/components/Button";
import FormField from "../common/components/FormField";
import Input from "../common/components/Input";

import "./BookingForm.css";
import { useEffect, useState } from "react";
import ModalClientForm from "./components/ModalClientForm";

type Room = {
  id: string;
  roomNumber: string;
  type: string;
  status: string;
  capacity: number;
  pricePerNight: string;
  description: string;
};

const BookingForm = () => {
  const nav = useNavigate();
  const location = useLocation();
  const room = location.state?.room as Room;

  const [clientsData, setClientsData] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    nAdults: 0,
    nChild: 0,
    bookingDate: Date.now(),
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date().toISOString().split('T')[0],
    status: "pending",
    totalPrice: 0.0,
    bookingOrigin: "",
    employeeId: 1,
    clientId: "1",
  });

  function calcularDiasEntreFechas() {
    const inicio = bookingData.checkIn;
    const fin = bookingData.checkOut;

    const diferenciaEnMilisegundos = new Date(fin).getTime() - new Date(inicio).getTime();

    const diferenciaEnDias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);

    return Math.round(diferenciaEnDias);
  }

  function postData() {
    let url = "/api/bookings";
    let cont = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nAdults: parseInt(bookingData.nAdults),
        nChild: parseInt(bookingData.nChild),
        bookingDate: bookingData.bookingDate,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        status: bookingData.status,
        totalPrice: bookingData.totalPrice,
        bookingOrigin: "system",
        employeeId: bookingData.employeeId,
        clientId: bookingData.clientId,
        rooms: [
          parseInt(room.id),
        ]
      }),
    };

    fetch(url, cont)
      .then((res) => {
        if (res.status == 200) {
          nav("/bookings");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getClients() {
    let url = "/api/clients";
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
        console.log(data);
        setClientsData(data);
      })
      .catch((error) => {
        console.error(error.toString());
      });
  }

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div className="booking-form">
      <div className="info--room">
        <h3>DETALLES DE HABITACIÓN</h3>
        <div className="info--row">
          <div>
            <h4>N HABITACIÓN:</h4>
            <span>{room.roomNumber}</span>
          </div>
          <div>
            <h4>TIPO:</h4>
            <span>{room.type}</span>
          </div>
          <div>
            <h4>ESTADO:</h4>
            <span>{room.status}</span>
          </div>
        </div>
        <div className="info--row">
          <div>
            <h4>DESCIPCIÓN:</h4>
            <span>{room.description}</span>
          </div>
          <div></div>
          <div>
            <h4>PRECIO:</h4>
            <span>{room.pricePerNight}</span>
          </div>
        </div>
      </div>

      <form
        className="booking-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="div--form">
          <FormField label="CLIENTE" errorMessage="">
            <div>
              <select
                name=""
                id=""
                onChange={(e) => {
                  setBookingData({
                    ...bookingData,
                    clientId: e.target.value,
                  });
                  console.log(e.target.value);
                }}
              >
                {clientsData.map((client, index) => (
                  <option key={index} value={client.id}>
                    {`${client.user?.dni}   |   ${client.user?.firstname} ${client.user?.lastname1
                      } ${client.user?.lastname2 ?? ""}`}
                  </option>
                ))}
              </select>
              <Button
                disabled={false}
                handleClick={() => {
                  setIsModalOpen(true);
                }}
              >
                +
              </Button>
              {isModalOpen && (
                <ModalClientForm
                  onClose={() => {
                    setIsModalOpen(false);
                  }}
                />
              )}
            </div>
          </FormField>
          <FormField label="NUMERO DE ADULTOS:" errorMessage=" ">
            <Input
              type="number"
              handleInput={(value: number) => {
                setBookingData({ ...bookingData, nAdults: value });
              }}
              value={bookingData.nAdults}
              resetMessage={() => { }}
            />
          </FormField>
          <FormField label="NUMERO DE NIÑOS:" errorMessage=" ">
            <Input
              type="number"
              handleInput={(value: number) => {
                setBookingData({ ...bookingData, nChild: value });
              }}
              value={bookingData.nChild}
              resetMessage={() => { }}
            />
          </FormField>
        </div>
        <div className="div--form div--form--row">
          <FormField label="FECHA DE ENTRADA:" errorMessage=" ">
            <Input
              type="date"
              handleInput={(value: string) => {
                setBookingData({
                  ...bookingData,
                  checkIn: value,
                });
                console.log(value);
              }}
              resetMessage={() => { }}
              value={bookingData.checkIn}
            />
          </FormField>
          <FormField label="FECHA DE SALIDA:" errorMessage=" ">
            <Input
              type="date"
              handleInput={(value: string) => {
                setBookingData({
                  ...bookingData,
                  checkOut: value,
                });
              }}
              resetMessage={() => {
                console.log("no reset");
              }}
              value={bookingData.checkOut}
            />
          </FormField>
        </div>
        <div className="div--form div--form--row">
          <FormField label="TOTAL A PAGAR:" errorMessage=" ">
            <Input
              type="number"
              handleInput={(value: number) => {
                setBookingData({ ...bookingData, totalPrice: value });
              }}
              resetMessage={() => { }}
              value={bookingData.totalPrice}
            />
          </FormField>
          <FormField label="DESCUENTO:" errorMessage=" ">
            <Input
              type="number"
              handleInput={(value: number) => {
                console.log(value);
              }}
              value={0}
              resetMessage={() => { }}
            />
          </FormField>
        </div>
        <div className="div--form">
          <Button
            handleClick={() => {
              postData();
            }}
          >
            Reservar
          </Button>
          <Button
            handleClick={function (): void {
              nav("/bookings");
            }}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
