import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

import "./PromotionsForm.css"
import FormField from "../common/components/FormField"
import Input from "../common/components/Input"
import Button from "../common/components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"


type Promotion = {
  id: number,
  description: string,
  startDate: string,
  endDate: string,
  discount: number,
  status: string,
  rooms: Room[]
}
type Room = {
  id: string,
  roomNumber: string,
  type: string,
  pricePerNight: number,
  status: string,
  capacity: number,
  description: string
}
const PromotionsForm = () => {
  const nav = useNavigate()
  const [params] = useSearchParams();
  const id = params.get("id")
  const [promotionData, setPromotionData] = useState<Promotion>({
    id: -1,
    description: "",
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    discount: 0,
    status: "",
    rooms: [],
  })

  const [roomsData, setRoomsData] = useState<Room[]>([])

  const [roomFilter1, setRoomFilter1] = useState("")
  const [roomFilter2, setRoomFilter2] = useState("")

  let prd = promotionData;

  function getData() {
    fetch(`/api/promotions/${id}`)
      .then(res => res.json())
      .then(data => {
        prd = {
          id: parseInt(id!),
          description: data.description,
          startDate: data.startDate.split('T')[0],
          endDate: data.endDate.split('T')[0],
          discount: data.discount,
          status: data.status,
          rooms: data.rooms
        }
        setPromotionData(prd)
      })
  }
  function getRoomsData() {
    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data: Room[]) => {
        setRoomsData(data.filter((room: Room) => !prd.rooms.some((rr) => rr.id === room.id)));
      })
      .catch((error) => {
        console.error(error.toString());
      });
  }

  function postData() {
    const id = promotionData.id != -1 ? promotionData.id : null;
    let url = `/api/promotions/${id ? id : ""}`;

    let cont = {
      method: id == null ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: promotionData.description,
        startDate: promotionData.startDate,
        endDate: promotionData.endDate,
        discount: promotionData.discount,
        status: promotionData.status,
        rooms: promotionData.rooms,
      })
    };
    fetch(url, cont)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          nav("/promotions")
        }
      })
      .catch((error) => {
        console.error(error.toString());
      })
  }

  function searchRooms(search: string, arr: Room[]) {
    if (search == "") return arr;

    let considences = arr.filter((room) => {
      return room.type.includes(search) || room.roomNumber.includes(search)
    })

    return considences
  }

  useEffect(() => {
    if (id != null) {
      getData();
    }
    getRoomsData();
    return () => {
      setPromotionData({
        id: -1,
        description: "",
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        discount: 0,
        status: "",
        rooms: [],
      });
      setRoomsData([]);
    }
  }, [id])


  return (
    <div>
      <form className="form--promotion"
        onSubmit={(e) => {
          e.preventDefault()
        }}>
        <h1>Promoción</h1>
        <FormField label="Estado" errorMessage="">
          <select name="" id="" onChange={() => { }}>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </select>
        </FormField>
        <FormField label="Descripción" errorMessage="">
          <Input type="text"
            placeholder="Descripción"
            value={promotionData.description}
            handleInput={(value: string) => {
              setPromotionData({ ...promotionData, description: value })
            }}
            resetMessage={() => { }}
          />
        </FormField>
        <FormField label="Descuento" errorMessage="">
          <Input type="number"
            placeholder="Descuento"
            value={promotionData.discount.toString()}
            handleInput={(value: number) => {
              setPromotionData({ ...promotionData, discount: value })
            }}
            resetMessage={() => { }}
          />
        </FormField>
        <FormField label="Fecha de Inicio" errorMessage="">
          <Input type="date"
            placeholder="Fecha de Inicio"
            value={promotionData.startDate}
            handleInput={(value: string) => {
              setPromotionData({ ...promotionData, startDate: value })
            }}
            resetMessage={() => { }}
          />
        </FormField>
        <FormField label="Fecha de Fin" errorMessage="">
          <Input type="date"
            placeholder="Fecha de Fin"
            value={promotionData.endDate}
            handleInput={(value: string) => {
              setPromotionData({ ...promotionData, endDate: value })
            }}
            resetMessage={() => { }}
          />
        </FormField>
        <h2>Habitaciones</h2>
        <FormField label="Habitaciones con tarifa" errorMessage="">
          <Input placeholder="Buscar: Numero de habitacion / Tipo"
            type="text"
            value={roomFilter1}
            handleInput={(value: string) => setRoomFilter1(value)}
            resetMessage={() => { }} />
        </FormField>
        <FormField label="Habitaciones sin tarifa" errorMessage="">
          <Input placeholder="Buscar: Numero de habitacion / Tipo"
            type="text"
            value={roomFilter2}
            handleInput={(value: string) => setRoomFilter2(value)}
            resetMessage={() => { }} />
        </FormField>
        <div className="div--rooms">
          {searchRooms(roomFilter1, promotionData.rooms).map((room: Room, index) => {
            return (
              <div key={index} className="room--item">
                <div>
                  <span>{index + 1}</span>
                  <span>{room.roomNumber}</span>
                  <span>{room.type}</span>
                </div>
                <Button handleClick={() => {
                  setPromotionData({
                    ...promotionData, rooms: promotionData.rooms.filter((r: Room) => r.id !== room.id)
                  })
                  setRoomsData([...roomsData, room])
                }}>
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
              </div>
            )
          })}
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
                <Button handleClick={() => {
                  setPromotionData({ ...promotionData, rooms: [...promotionData.rooms, room] })
                  setRoomsData(roomsData.filter((r) => r.id !== room.id))
                }}>
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </div>
            )
          })}
        </div>
        <Button handleClick={postData}>
          Guardar
        </Button>
        <Button handleClick={() => nav("/promotions")}>
          Cancelar
        </Button>
      </form>
    </div>
  )
}

export default PromotionsForm