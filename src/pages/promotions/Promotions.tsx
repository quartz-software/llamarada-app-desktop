import { useNavigate } from "react-router-dom";
import Button from "../../shared/components/Button";
import FormField from "../../shared/components/FormField";
import Input from "../../shared/components/Input";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import "./Promotions.css";

type Promotion = {
  id: number;
  description: string;
  startDate: string;
  endDate: string;
  discount: number;
  status: string;
};
const formatDate = (isoDate: string) => {
  const date = isoDate.split("T")[0];
  const dateParts = date.split("-");

  return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
};

const Promotions = () => {
  const nav = useNavigate();
  const [promotionsData, setPromotionsData] = useState<Promotion[]>([]);

  async function getData() {
    try {
      const res = await fetch("/api/promotions");
      const data = await res.json();
      setPromotionsData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Promociones</h1>
      <div className="div--search">
        <FormField label="Buscar" errorMessage="">
          <Input
            handleInput={() => {}}
            resetMessage={() => {}}
            placeholder="Buscar"
            type="text"
            value=""
          />
        </FormField>
        <Button
          disabled={false}
          handleClick={() => {
            nav(`/promotions/edit`);
          }}
        >
          Agregar
        </Button>
      </div>
      <table className="table--promotions">
        <thead>
          <th>Id</th>
          <th>Descripcion</th>
          <th>Descueto</th>
          <th>Fecha Inicio</th>
          <th>Fecha Fin</th>
          <th>Estado</th>
          <th></th>
        </thead>
        <tbody>
          {promotionsData.map((promotion: Promotion) => {
            return (
              <tr>
                <td>{promotion.id}</td>
                <td>{promotion.description}</td>
                <td>{promotion.discount}</td>
                <td>{formatDate(promotion.startDate)}</td>
                <td>{formatDate(promotion.endDate)}</td>
                <td>{promotion.status}</td>
                <td>
                  <Button
                    disabled={false}
                    handleClick={() => {
                      nav(`/promotions/edit?id=${promotion.id}`);
                    }}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {promotionsData.length == 0 ? (
        <div className="div--nd">No se encontraron promociones</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Promotions;
