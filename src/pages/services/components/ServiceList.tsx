import React from "react";
import Button from "../../../shared/components/Button";
import "./ServiceList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Servicio } from "@/shared/types/db/servicio";

interface ServiceListProps {
  services: Servicio[];
  onDelete: (id: number) => void;
  onEdit: (service: Servicio) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({
  services,
  onDelete,
  onEdit,
}) => {
  const ServiceTypes = [
    "Alimentos",
    "Limpieza"
  ];
  return (
    <div className="service-list">
      <table className="service-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Horario</th>
            <th>Disponibilidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.nombre}</td>
              <td>{ServiceTypes[service.idTipoServicio - 1]}</td>
              <td>
                {service.precio} {service.moneda.toUpperCase()}
              </td>
              <td>
                {service.horaApertura} - {service.horaCierre}
              </td>
              <td
                className={`service-availability ${service.disponible ? "available" : "unavailable"
                  }`}
              >
                <span>
                  {service.disponible ? "Disponible" : "No Disponible"}
                </span>
              </td>
              <td className="service-actions">
                <div>
                  <Button handleClick={() => onEdit(service)} disabled={false}>
                    <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                  </Button>
                  <Button
                    handleClick={() => onDelete(service.id)}
                    disabled={false}
                  >
                    <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceList;
