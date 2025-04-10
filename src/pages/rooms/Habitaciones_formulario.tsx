import { useEffect, useState } from "react";
import Button from "../common/components/Button";
import FormField from "../common/components/FormField";
import Input from "../common/components/Input";
import "./Habitaciones_formulario.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import RoomImage from "./components/RoomImage";


type Room = {
  id: number,
  roomNumber: string,
  type: string,
  pricePerNight: string,
  status: string,
  capacity: number,
  description: string,
  images: RoomImage[]
}

const Habitaciones_formulario = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get("id");

  const [roomData, setRoomData] = useState<Room>({
    id: -1,
    roomNumber: "",
    type: "normal",
    pricePerNight: "",
    status: "unavailable",
    capacity: 0,
    description: "",
    images: []
  });

  //const [RoomImages, setRoomImages] = useState<RoomImage[]>([])

  function getData() {
    fetch(`/api/rooms/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRoomData({
          id: parseInt(id!),
          roomNumber: data.roomNumber,
          type: data.type,
          pricePerNight: data.pricePerNight,
          status: data.status,
          capacity: data.capacity,
          description: data.description,
          images: data.images
        })
      }
      );
  }

  function postData() {
    const formData = new FormData();
    formData.append("roomNumber", roomData.roomNumber);
    formData.append("capacity", roomData.capacity.toString());
    formData.append("status", roomData.status);
    formData.append("type", roomData.type);
    formData.append("pricePerNight", roomData.pricePerNight);
    formData.append("description", roomData.description);

    const imageMetaData: { id: number | null, index: number, name: string, type: string, url?: string }[] = [];
    roomData.images.forEach((image, index) => {

      if (image.file) {
        formData.append("images", image.file);
      }

      imageMetaData.push({
        index,
        name: image.name,
        type: image.type,
        url: image.url,
        id: image.id ? image.id : null
      })
    })


    formData.append("images", JSON.stringify(imageMetaData))


    const id = roomData.id != -1 ? roomData.id : null;
    let url = `/api/rooms/${id ? id : ""}`;

    let cont = {
      method: id == null ? "POST" : "PUT",

      body: formData,
    };

    fetch(url, cont)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          navigate("/rooms");
        }
      })
      .catch((error) => {
        console.log(error.toString());
      });
  }
  useEffect(() => {
    if (id != null) {
      getData();
    }
  }, []);
  return (
    <div>
      <h1>Habitación</h1>
      <form
        className="form--room"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <FormField label="Numero Habitacion" errorMessage=" ">
          <Input
            placeholder="Numero Habitacion"
            type="text"
            handleInput={(value: string) => {
              setRoomData({ ...roomData, roomNumber: value });
            }}
            value={roomData.roomNumber}
            resetMessage={() => { }}
          />
        </FormField>

        <FormField label="Capacidad" errorMessage=" ">
          <Input
            type="number"
            placeholder="Capacidad"
            handleInput={(value: string) => {
              setRoomData({ ...roomData, capacity: parseInt(value) });
            }}
            value={roomData.capacity.toString()}
            resetMessage={() => { }}
          />
        </FormField>
        <FormField label="Estado" errorMessage="">
          <select
            value={roomData.status}
            onChange={(e) => {
              setRoomData({ ...roomData, status: e.target.value });
            }}
          >
            <option value="unavailable">No disponible</option>
            <option value="available">Disponible</option>
            <option value="occupied">Ocupado</option>
            <option value="maintenance">Mantemiento</option>
            <option value="cleaning">Limpieza</option>
          </select>
        </FormField>

        <FormField label="Tipo" errorMessage=" ">
          <select
            value={roomData.type}
            onChange={(e) => {
              setRoomData({ ...roomData, type: e.target.value });
            }}
          >
            <option value="suite">Suite</option>
            <option value="normal">Normal</option>
            <option value="premium">Premium</option>
          </select>
        </FormField>
        <FormField label="Precio" errorMessage="">
          <Input
            type="number"
            placeholder="Precio"
            handleInput={(value: string) => {
              setRoomData({ ...roomData, pricePerNight: value });
            }}
            value={roomData.pricePerNight}
            resetMessage={() => { }}
          />
        </FormField>
        <FormField label="Descripcion" errorMessage=" " modifier="description">
          <textarea
            placeholder="Descripcion"
            onChange={(e) => {
              setRoomData({ ...roomData, description: e.target.value });
            }}
            value={roomData.description}
          >
          </textarea>
        </FormField>
        <div>
          <h2>Promociones</h2>
          <div className="promotion__select">
            <select
              onChange={(e) => {
                console.log(e);
              }}
            >
              <option value="">Seleccione una promocion</option>
            </select>
            <Button handleClick={() => { }}>
              Añadir
            </Button>
          </div>
        </div>
        <div className="form__div--row">
          <div className="form__title-imgs">
            <h2>Imagenes</h2>
            <Button handleClick={() => {
              setRoomData({ ...roomData, images: [...roomData.images, { name: "", path: undefined, type: "normal", url: undefined, file: undefined }] })
            }}>
              Añadir
            </Button>
          </div>
          {
            roomData.images.length == 0 ?
              <div className="div--msg-nd">No tiene imagenes</div> :
              <div className="div-images">
                {roomData.images.map((item, index) => {
                  return <RoomImage
                    key={index}
                    model={{ name: item.name, type: item.type, path: item.path, url: item.url, file: item.file }}
                    onChange={(file) => {
                      const acFields = [...roomData.images]
                      acFields[index].file = file
                      setRoomData({ ...roomData, images: acFields })
                    }}
                    onDelete={() => {
                      const acFields = [...roomData.images]
                      acFields.splice(index, 1)
                      setRoomData({ ...roomData, images: acFields })
                    }}
                  ></RoomImage>
                })}
              </div>
          }
        </div>

        <Button disabled={false} handleClick={postData}>
          Guardar
        </Button>
        <Button
          disabled={false}
          handleClick={() => {
            navigate("/rooms");
          }}
        >
          Cancelar
        </Button>
      </form >
    </div >
  );
};

export default Habitaciones_formulario;
