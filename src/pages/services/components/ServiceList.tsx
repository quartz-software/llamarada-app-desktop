import React from "react";
import Button from "../../common/components/Button";
import "./ServiceList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

interface ServiceListProps {
  services: Service[];
  onDelete: (id: number) => void;
  onEdit: (service: Service) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({
  services,
  onDelete,
  onEdit,
}) => {
  const ServiceTypes = {
    "room service": "Servicio a la Habitacion",
    cleaning: "Limpieza",
    wellness: "Bienestar",
    transport: "Transporte",
    other: "Otro",
  };
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
              <td>{service.name}</td>
              <td>{ServiceTypes[service.type]}</td>
              <td>
                {service.price} {service.currency.toUpperCase()}
              </td>
              <td>
                {service.openHour} - {service.closeHour}
              </td>
              <td
                className={`service-availability ${
                  service.available ? "available" : "unavailable"
                }`}
              >
                <span>
                  {service.available ? "Disponible" : "No Disponible"}
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
