import { useEffect, useState } from "react";
import Button from "../../shared/components/Button";
import FormField from "../../shared/components/FormField";
import Input from "../../shared/components/Input";
import "./Habitaciones_formulario.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import RoomImage from "./components/RoomImage";
import { Habitacion } from "@/shared/types/db/habitacion";


const Habitaciones_formulario = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get("id");

  const [roomData, setRoomData] = useState<Habitacion>({
    id: -1,
    numeroHabitacion: "",
    capacidad: 0,
    descripcion: "",
    idTipoHabitacion: 1,
    idEstadoHabitacion: 1,
    imagenes: [],
  });

  //const [RoomImages, setRoomImages] = useState<RoomImage[]>([])

  async function getData() {
    try {
      let url = `/api/rooms/${id}`;
      const res = await fetch(url)
      const data = await res.json()
      console.log(data);
      setRoomData(data);
    } catch (error) {
      navigate("/rooms")
      console.error(error)
    }
  }

  async function postData() {
    try {
      const formData = new FormData();
      formData.append("numeroHabitacion", roomData.numeroHabitacion);
      formData.append("capacidad", roomData.capacidad.toString());
      formData.append("idEstadoHabitacion", roomData.idEstadoHabitacion.toString());
      formData.append("idTipoHabitacion", roomData.idTipoHabitacion.toString());
      // formData.append("pricePerNight", roomData.pricePerNight);
      formData.append("descripcion", roomData.descripcion ?? "");

      const imageMetaData: {
        id: number | null;
        index: number;
        name: string;
        type: string;
        url?: string;
      }[] = [];
      roomData.imagenes!.forEach((image, index) => {
        if (image.url) {
          formData.append("imagenes", image.url);
        }

        imageMetaData.push({
          index,
          name: "",
          type: image.tipoImagen,
          url: image.url,
          id: image.id ? image.id : null,
        });
      });

      formData.append("images", JSON.stringify(imageMetaData));
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": ", pair[1]);
      }


      const id = roomData.id != -1 ? roomData.id : null;
      let url = `/api/rooms/${id ? id : ""}`;

      let cont = {
        method: id == null ? "POST" : "PUT",
        body: formData,
      };

      const res = await fetch(url, cont)
      const status = res.status
      console.log(status);

      if (status === 201 || status === 204) {
        navigate("/rooms");
      }
    } catch (error) {
      console.log(error);
    }
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
              setRoomData({ ...roomData, numeroHabitacion: value });
            }}
            value={roomData.numeroHabitacion}
            resetMessage={() => { }}
          />
        </FormField>

        <FormField label="Capacidad" errorMessage=" ">
          <Input
            type="number"
            placeholder="Capacidad"
            handleInput={(value: string) => {
              setRoomData({ ...roomData, capacidad: parseInt(value) });
            }}
            value={roomData.capacidad.toString()}
            resetMessage={() => { }}
          />
        </FormField>
        <FormField label="Estado" errorMessage="">
          <select
            value={roomData.idEstadoHabitacion}
            onChange={(e) => {
              setRoomData({ ...roomData, idEstadoHabitacion: Number(e.target.value) });
            }}
          >
            <option value="7">No disponible</option>
            <option value="1">Disponible</option>
            <option value="2">Ocupado</option>
            <option value="6">Mantemiento</option>
            <option value="5">Limpieza</option>
          </select>
        </FormField>

        <FormField label="Tipo" errorMessage=" ">
          <select
            value={roomData.idTipoHabitacion}
            onChange={(e) => {
              setRoomData({ ...roomData, idTipoHabitacion: Number(e.target.value) });
            }}
          >
            <option value="1">Normal</option>
            <option value="2">Suite</option>
            <option value="3">Premium</option>
          </select>
        </FormField>
        {/* <FormField label="Precio" errorMessage="">
          <Input
            type="number"
            placeholder="Precio"
            handleInput={(value: string) => {
              setRoomData({ ...roomData, pricePerNight: value });
            }}
            value={roomData.pricePerNight}
            resetMessage={() => { }}
          />
        </FormField> */}
        <FormField label="Descripcion" errorMessage=" " modifier="description">
          <textarea
            placeholder="Descripcion"
            onChange={(e) => {
              setRoomData({ ...roomData, descripcion: e.target.value });
            }}
            value={roomData.descripcion}
          ></textarea>
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
            <Button handleClick={() => { }}>Añadir</Button>
          </div>
        </div>
        <div className="form__div--row">
          <div className="form__title-imgs">
            <h2>Imagenes</h2>
            <Button
              disabled
              handleClick={() => {
                setRoomData({
                  ...roomData,
                  imagenes: [
                    ...(roomData.imagenes!),
                    {
                      id: -1,
                      url: "",
                      tipoImagen: "plano",
                      descripcion: "",
                      idHabitacion: roomData.id
                    },
                  ],
                });
              }}
            >
              Añadir
            </Button>
          </div>
          {roomData.imagenes && roomData.imagenes.length == 0 ? (
            <div className="div--msg-nd">No tiene imagenes</div>
          ) : (
            <div className="div-images">
              {roomData.imagenes!.map((item, index) => {
                return (
                  <RoomImage
                    key={index}
                    model={{
                      name: "",
                      type: item.tipoImagen,
                      path: item.url,
                    }}
                    onChange={(file) => {
                      const acFields = [...roomData.imagenes!];
                      acFields[index].file = file;
                      setRoomData({ ...roomData, imagenes: acFields });
                    }}
                    onDelete={() => {
                      const acFields = [...roomData.imagenes!];
                      acFields.splice(index, 1);
                      setRoomData({ ...roomData, imagenes: acFields });
                    }}
                  ></RoomImage>
                );
              })}
            </div>
          )}
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
      </form>
    </div>
  );
};

export default Habitaciones_formulario;
