import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../shared/components/Button";
import FormField from "../../shared/components/FormField";
import Input from "../../shared/components/Input";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

import "./RoomRatesForm.css";
import { Tarifa } from "@/shared/types/db/tarifa";
import { Habitacion } from "@/shared/types/db/habitacion";

const RoomRatesForm = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get("id");

  const [roomRateData, setRoomRateData] = useState<Tarifa>({
    id: -1,
    fechaInicio: new Date(),
    fechaFin: new Date(),
    precio: 0,
    activo: true,
    habitaciones: [],
  });

  const [roomsData, setRoomsData] = useState<Habitacion[]>([]);

  const [roomFilter1, setRoomFilter1] = useState("");
  const [roomFilter2, setRoomFilter2] = useState("");

  async function getData() {
    try {
      const res = await fetch(`/api/rates/${id}`)
      const data = await res.json()
      setRoomRateData(data);

      setTimeout(() => {
        getRoomsData(data)
      })

    } catch (error) {
      console.error(error);
    }
  }
  async function getRoomsData(tarifa: Tarifa) {
    try {
      const res = await fetch("/api/rooms")
      const data = await res.json()
      setRoomsData(
        data.filter(
          (room: Habitacion) => !tarifa.habitaciones?.some((rr) => rr.id === room.id)
        )
      );
    } catch (error) {
      console.error(error)
    }
  }

  async function postData() {
    try {
      const id = roomRateData.id != -1 ? roomRateData.id : null;
      let url = `/api/rates/${id ? id : ""}`;


      let cont = {
        method: id == null ? "POST" : "PUT",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fechaInicio: roomRateData.fechaInicio,
          fechaFin: roomRateData.fechaFin,
          precio: roomRateData.precio,
          activo: roomRateData.activo,
          rooms: roomRateData.habitaciones?.map((h) => h.id),
        }),
      };
      console.log(cont.body);

      const res = await fetch(url, cont)
      if (res.status == 201 || res.status == 204) {
        navigate("/rates");
      }
    } catch (error) {
      console.error(error);
    }
  }

  function searchRooms(search: string, arr: Habitacion[]) {
    if (search == "") return arr;

    let considences = arr.filter((room) => {
      return room.tipo?.nombre.includes(search) || room.numeroHabitacion.includes(search);
    });
    return considences;
  }

  useEffect(() => {
    if (id != null) {
      getData();
    }
    return () => {
      setRoomRateData({
        id: -1,
        fechaInicio: new Date(),
        fechaFin: new Date(),
        precio: 0,
        activo: true,
        habitaciones: [],
      });
      setRoomsData([]);
    };
  }, [id]);
  return (
    <div>
      <form
        className="form--rate"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1>Tarifa</h1>
        <FormField label="Precio" errorMessage="">
          <Input
            placeholder="Precio"
            type="number"
            handleInput={(value: string) => {
              setRoomRateData({ ...roomRateData, precio: Number(value) });
            }}
            value={roomRateData.precio.toString()}
            resetMessage={() => { }}
          />
        </FormField>
        <FormField label="Estado" errorMessage="">
          <Input
            placeholder="Estado"
            type="checkbox"
            handleInput={(value: boolean) => {
              setRoomRateData({
                ...roomRateData,
                activo: value,
              });
            }}
            value={roomRateData.activo}
            resetMessage={() => { }}
          />
        </FormField>
        <FormField label="Fecha de inicio" errorMessage="">
          <Input
            placeholder="Fecha de inicio"
            type="date"
            handleInput={(value: string) => {
              setRoomRateData({ ...roomRateData, fechaInicio: new Date(value) });
            }}
            value={roomRateData.fechaInicio ? new Date(roomRateData.fechaInicio).toISOString().split("T")[0] : ""}
            resetMessage={() => { }}
          />
        </FormField>
        <FormField label="Fecha fin" errorMessage="">
          <Input
            placeholder="Fecha fin"
            type="date"
            handleInput={(value: Date) => {
              setRoomRateData({ ...roomRateData, fechaFin: value });
            }}
            value={roomRateData.fechaFin ? new Date(roomRateData.fechaFin).toISOString().split("T")[0] : ""}
            resetMessage={() => { }}
          />
        </FormField>
        <h2>Habitaciones</h2>
        <FormField label="Habitaciones con tarifa" errorMessage="">
          <Input
            placeholder="Buscar: Numero de habitacion / Tipo"
            type="text"
            value={roomFilter1}
            handleInput={(value: string) => setRoomFilter1(value)}
            resetMessage={() => { }}
          />
        </FormField>
        <FormField label="Habitaciones sin tarifa" errorMessage="">
          <Input
            placeholder="Buscar: Numero de habitacion / Tipo"
            type="text"
            value={roomFilter2}
            handleInput={(value: string) => setRoomFilter2(value)}
            resetMessage={() => { }}
          />
        </FormField>
        <div className="div--rooms">
          {searchRooms(roomFilter1, roomRateData.habitaciones ?? []).map(
            (room: Habitacion, index) => {
              return (
                <div key={index} className="room--item">
                  <div>
                    <span>{index + 1}</span>
                    <span>{room.numeroHabitacion}</span>
                    <span>{room.tipo?.nombre}</span>
                  </div>
                  <Button
                    handleClick={() => {
                      setRoomRateData({
                        ...roomRateData,
                        habitaciones: (roomRateData.habitaciones ?? []).filter(
                          (r) => r.id !== room.id
                        ),
                      });
                      setRoomsData([...roomsData, room]);
                    }}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </Button>
                </div>
              );
            }
          )}
        </div>
        <div className="div--rooms">
          {searchRooms(roomFilter2, roomsData).map((room: Habitacion, index) => {
            return (
              <div key={index} className="room--item">
                <div>
                  <span>{index + 1}</span>
                  <span>{room.numeroHabitacion}</span>
                  <span>{room.tipo?.nombre}</span>
                </div>
                <Button
                  handleClick={() => {
                    setRoomRateData({
                      ...roomRateData,
                      habitaciones: [...roomRateData.habitaciones ?? [], room],
                    });
                    setRoomsData(roomsData.filter((r) => r.id !== room.id));
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </div>
            );
          })}
        </div>
        <Button disabled={false} handleClick={postData}>
          Guardar
        </Button>
        <Button
          disabled={false}
          handleClick={() => {
            navigate("/rates");
          }}
        >
          Cancelar
        </Button>
      </form>
    </div>
  );
};

export default RoomRatesForm;
