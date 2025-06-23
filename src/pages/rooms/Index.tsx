import { useEffect, useState } from "react";
import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import "./Index.css";
import { useNavigate } from "react-router-dom";
import FormField from "../../shared/components/FormField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Habitacion } from "@/shared/types/db/habitacion";

const Index = () => {
  const nav = useNavigate();
  const [roomsData, setRoomsData] = useState([]);
  async function getData() {
    try {
      const url = "/api/rooms";
      const res = await fetch(url)
      const data = await res.json()
      setRoomsData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h1>Habitaciones</h1>
      <div className="div--search">
        <FormField label="Buscar" errorMessage="">
          <Input
            handleInput={() => { }}
            resetMessage={() => { }}
            placeholder="Buscar"
            type="text"
            value=""
          />
        </FormField>
        <Button
          disabled={false}
          handleClick={() => {
            nav(`/rooms/form`);
          }}
        >
          Agregar
        </Button>
      </div>
      <table className="table--rooms">
        <thead>
          <tr>
            <th>Id</th>
            <th>Numero</th>
            <th>Tipo</th>
            <th>Capacidad</th>
            {/* <th>Precio/noche</th> */}
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {roomsData.length == 0 ? (
            <tr >
              <td>
                <div className="div--nd">No se encomtraron cuartos</div>
              </td>
            </tr>
          ) : (
            <>
              {roomsData.map((habitacion: Habitacion, index) => {
                return (
                  <tr key={index}>
                    <td>{habitacion.id}</td>
                    <td>{habitacion.numeroHabitacion}</td>
                    <td>
                      {habitacion.tipo && habitacion.tipo.nombre
                        ? habitacion.tipo.nombre.charAt(0).toUpperCase() + habitacion.tipo.nombre.slice(1)
                        : ""}
                    </td>
                    <td>{habitacion.capacidad}</td>
                    {/* <td>{habitacion.pricePerNight}</td> */}
                    <td>
                      {habitacion.estado && habitacion.estado.nombre
                        ? habitacion.estado.nombre.charAt(0).toUpperCase() + habitacion.estado.nombre.slice(1)
                        : ""}
                    </td>
                    <td>
                      <Button
                        disabled={false}
                        handleClick={() => {
                          nav(`/rooms/form?id=${habitacion.id}`);
                        }}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
