import React, { useEffect, useState } from "react";
import './components/AditionalService.css';  
import { ServicioSolicitado } from "@/shared/types/db/servicio-solicitado";
const AditionalServices: React.FC = () => {
  const [services, setServices] = useState<ServicioSolicitado[]>([]);

  useEffect(() => {
    fetch("/api/additional-services")
      .then((response) => {
        if (!response.ok) {
          throw new Error("error consulta");
        }
        return response.json();  
      })
      .then((data) => {
        setServices(data);  
      })
      .catch((error) => {
        console.error("Error:", error);  
      });
  }, []);  

  return (
    <div className="services-container">
      <h1>Servicios Adicionales</h1>
      <table className="services-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{new Date(service.createdAt).toLocaleString()}</td>
              <td>{service.estado?.nombre}</td>
              <td>{service.descripcion || "Sin descripción"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AditionalServices;
