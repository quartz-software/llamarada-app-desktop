import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../shared/components/Button";
import FormField from "../../shared/components/FormField";
import Input from "../../shared/components/Input";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

import "./RoomRatesForm.css";

type Room = {
  id: string;
  roomNumber: string;
  type: string;
  pricePerNight: number;
  status: string;
  capacity: number;
  description: string;
};

type RoomRateData = {
  id: number;
  startDate: string;
  endDate: string;
  pricePerNight: string;
  isActive: boolean;
  rooms: Room[];
};

const RoomRatesForm = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get("id");

  const [roomRateData, setRoomRateData] = useState<RoomRateData>({
    id: -1,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    pricePerNight: "",
    isActive: true,
    rooms: [],
  });

  const [roomsData, setRoomsData] = useState<Room[]>([]);

  const [roomFilter1, setRoomFilter1] = useState("");
  const [roomFilter2, setRoomFilter2] = useState("");

  let rrd = roomRateData;
  function getData() {
    fetch(`/api/rates/${id}`)
      .then((response) => response.json())
      .then((data) => {
        rrd = {
          id: parseInt(id!),
          startDate: data.startDate.split("T")[0],
          endDate: data.endDate.split("T")[0],
          pricePerNight: data.pricePerNight,
          isActive: data.isActive,
          rooms: data.rooms,
        };
        setRoomRateData(rrd);
      });
  }
  function getRoomsData() {
    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data: Room[]) => {
        setRoomsData(
          data.filter(
            (room: Room) => !rrd.rooms.some((rr) => rr.id === room.id)
          )
        );
      })
      .catch((error) => {
        console.error(error.toString());
      });
  }

  function postData() {
    const id = roomRateData.id != -1 ? roomRateData.id : null;
    let url = `/api/rates/${id ? id : ""}`;

    let cont = {
      method: id == null ? "POST" : "PUT",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: roomRateData.startDate,
        endDate: roomRateData.endDate,
        pricePerNight: parseFloat(roomRateData.pricePerNight),
        isActive: roomRateData.isActive,
        rooms: roomRateData.rooms,
      }),
    };

    fetch(url, cont)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          navigate("/rates");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function searchRooms(search: string, arr: Room[]) {
    if (search == "") return arr;

    let considences = arr.filter((room) => {
      return room.type.includes(search) || room.roomNumber.includes(search);
    });

    return considences;
  }

  useEffect(() => {
    if (id != null) {
      getData();
    }
    getRoomsData();
    return () => {
      setRoomRateData({
        id: -1,
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date().toISOString().split("T")[0],
        pricePerNight: "",
        isActive: true,
        rooms: [],
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
              setRoomRateData({ ...roomRateData, pricePerNight: value });
            }}
            value={roomRateData.pricePerNight}
            resetMessage={() => {}}
          />
        </FormField>
        <FormField label="Estado" errorMessage="">
          <Input
            placeholder="Estado"
            type="checkbox"
            handleInput={(value: boolean) => {
              setRoomRateData({
                ...roomRateData,
                isActive: value ? true : false,
              });
            }}
            value={roomRateData.isActive ? true : false}
            resetMessage={() => {}}
          />
        </FormField>
        <FormField label="Fecha de inicio" errorMessage="">
          <Input
            placeholder="Fecha de inicio"
            type="date"
            handleInput={(value: string) => {
              setRoomRateData({ ...roomRateData, startDate: value });
            }}
            value={roomRateData.startDate}
            resetMessage={() => {}}
          />
        </FormField>
        <FormField label="Fecha fin" errorMessage="">
          <Input
            placeholder="Fecha fin"
            type="date"
            handleInput={(value: string) => {
              setRoomRateData({ ...roomRateData, endDate: value });
            }}
            value={roomRateData.endDate}
            resetMessage={() => {}}
          />
        </FormField>
        <h2>Habitaciones</h2>
        <FormField label="Habitaciones con tarifa" errorMessage="">
          <Input
            placeholder="Buscar: Numero de habitacion / Tipo"
            type="text"
            value={roomFilter1}
            handleInput={(value: string) => setRoomFilter1(value)}
            resetMessage={() => {}}
          />
        </FormField>
        <FormField label="Habitaciones sin tarifa" errorMessage="">
          <Input
            placeholder="Buscar: Numero de habitacion / Tipo"
            type="text"
            value={roomFilter2}
            handleInput={(value: string) => setRoomFilter2(value)}
            resetMessage={() => {}}
          />
        </FormField>
        <div className="div--rooms">
          {searchRooms(roomFilter1, roomRateData.rooms).map(
            (room: Room, index) => {
              return (
                <div key={index} className="room--item">
                  <div>
                    <span>{index + 1}</span>
                    <span>{room.roomNumber}</span>
                    <span>{room.type}</span>
                  </div>
                  <Button
                    handleClick={() => {
                      setRoomRateData({
                        ...roomRateData,
                        rooms: roomRateData.rooms.filter(
                          (r: Room) => r.id !== room.id
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
          {searchRooms(roomFilter2, roomsData).map((room: Room, index) => {
            return (
              <div key={index} className="room--item">
                <div>
                  <span>{index + 1}</span>
                  <span>{room.roomNumber}</span>
                  <span>{room.type}</span>
                </div>
                <Button
                  handleClick={() => {
                    setRoomRateData({
                      ...roomRateData,
                      rooms: [...roomRateData.rooms, room],
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
