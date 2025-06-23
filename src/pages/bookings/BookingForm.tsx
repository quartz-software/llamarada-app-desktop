import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../shared/components/Button";
import FormField from "../../shared/components/FormField";
import Input from "../../shared/components/Input";

import "./BookingForm.css";
import { useEffect, useState } from "react";
import ModalClientForm from "./components/ModalClientForm";
import { Habitacion } from "@/shared/types/db/habitacion";
import { Cliente } from "@/shared/types/db/cliente";
import { Reserva } from "@/shared/types/db/reserva";

const BookingForm = () => {
  const nav = useNavigate();
  const location = useLocation();
  const room = location.state?.room as Habitacion;

  const [clientsData, setClientsData] = useState<Cliente[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState<Reserva>({
    id: -1,
    numAdultos: 0,
    numNinos: 0,
    checkIn: new Date(),
    checkOut: new Date(),
    idEstado: 2,
    origenReserva: "system",
    idCliente: 0,
    createdAt: new Date(),
  });

  async function postData() {
    try {

      let url = "/api/bookings";
      let cont = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idCliente: bookingData.idCliente,
          numAdultos: bookingData.numAdultos,
          numNinos: bookingData.numNinos,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          precioTotal: bookingData.precioTotal,
          origenReserva: "system",
          rooms: [room.id],
        }),
      };
      const res = await fetch(url, cont)
      if (res.status == 200) {
        nav("/bookings");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getClients() {
    try {
      let url = "/api/clients";
      let cont = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(url, cont)
      const data = await res.json()
      setClientsData(data);

    } catch (error) {
      console.error(error);
    }
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
            <span>{room.numeroHabitacion}</span>
          </div>
          <div>
            <h4>TIPO:</h4>
            <span>{room.tipo?.nombre}</span>
          </div>
          <div>
            <h4>ESTADO:</h4>
            <span>{room.estado?.nombre}</span>
          </div>
        </div>
        <div className="info--row">
          <div>
            <h4>DESCIPCIÓN:</h4>
            <span>{room.descripcion}</span>
          </div>
          <div></div>
          <div>
            <h4>PRECIO:</h4>
            <span>{room.tarifas?.[0]?.precio ?? "N/A"}</span>
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
                    idCliente: Number(e.target.value),
                  });
                }}
              >
                <option>--- Seleccione un cliente ---</option>
                {
                  clientsData.map((client, index) => (
                    <option key={index} value={client.id}>
                      {`${client.dni}\t|\t${client.nombre1} ${client.nombre2} ${client.apellido1} ${client.apellido2}`}
                    </option>
                  ))
                }
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
                setBookingData({ ...bookingData, numAdultos: value });
              }}
              value={bookingData.numAdultos}
              resetMessage={() => { }}
            />
          </FormField>
          <FormField label="NUMERO DE NIÑOS:" errorMessage=" ">
            <Input
              type="number"
              handleInput={(value: number) => {
                setBookingData({ ...bookingData, numNinos: value });
              }}
              value={bookingData.numNinos}
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
                  ...bookingData, checkIn: new Date(value),
                });
              }}
              resetMessage={() => { }}
              value={new Date(bookingData.checkIn).toISOString().split("T")[0]}
            />
          </FormField>
          <FormField label="FECHA DE SALIDA:" errorMessage=" ">
            <Input
              type="date"
              handleInput={(value: string) => {
                setBookingData({ ...bookingData, checkOut: new Date(value) });
              }}
              resetMessage={() => { }}
              value={new Date(bookingData.checkOut).toISOString().split("T")[0]}
            />
          </FormField>
        </div>
        <div className="div--form div--form--row">
          <FormField label="TOTAL A PAGAR:" errorMessage=" ">
            <Input
              type="number"
              handleInput={(value: number) => {
                setBookingData({ ...bookingData, precioTotal: value });
              }}
              resetMessage={() => { }}
              value={bookingData.precioTotal ?? 0}
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
