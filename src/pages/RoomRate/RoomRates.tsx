import Input from "../../shared/components/Input";
import FormField from "../../shared/components/FormField";
import Button from "../../shared/components/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import "./RoomRates.css";
import { Tarifa } from "@/shared/types/db/tarifa";

const formatDate = (dateData?: Date) => {
  if (!dateData) return "";
  const isoDate = new Date(dateData).toISOString()
  let date = isoDate.split("T")[0];
  let dateParts = date.split("-");

  return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
};

const RoomRates = () => {
  const nav = useNavigate();
  const [roomRatesData, setRoomRatesData] = useState<Tarifa[]>([]);

  async function getData() {
    try {
      let url = "/api/rates";
      const res = await fetch(url)
      const data = await res.json()
      setRoomRatesData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Tarifas de habitacion</h1>
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
            nav(`/rates/edit`);
          }}
        >
          Agregar
        </Button>
      </div>
      <table className="table--rates">
        <thead>
          <th>Id</th>
          <th>Fecha Inicio</th>
          <th>Fecha Fin</th>
          <th>Precio/noche</th>
          <th>Estado</th>
          <th></th>
        </thead>
        {roomRatesData.length == 0 ? (
          <div className="div--nd">No se encomtraron cuartos</div>
        ) : (
          <tbody>
            {roomRatesData.map((tarifa: Tarifa, index) => {
              return (
                <tr key={index}>
                  <td>{tarifa.id}</td>
                  <td>{formatDate(tarifa.fechaInicio)}</td>
                  <td>{formatDate(tarifa.fechaFin)}</td>
                  <td>{tarifa.precio}</td>
                  <td>{tarifa.activo ? "Activo" : "Deshabilitado"}</td>
                  <td>
                    <Button
                      disabled={false}
                      handleClick={() => {
                        nav(`/rates/edit?id=${tarifa.id}`);
                      }}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default RoomRates;
