import React, { useState } from "react";
import "./ServiceModal.css";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import FormField from "../../../shared/components/FormField";
import { Servicio } from "@/shared/types/db/servicio";

interface ServiceModalProps {
  onClose: () => void;
  onSave: (service: Servicio) => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ onClose, onSave }) => {
  const [serviceData, setServiceData] = useState<Servicio>({
    id: 0,
    nombre: "",
    descripcion: "",
    restricciones: "",
    idTipoServicio: 1,
    moneda: "usd",
    precio: 0,
    horaApertura: "08:00",
    horaCierre: "18:00",
    disponible: false,
  });
  const handleSave = () => {
    onSave(serviceData);
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (
          e.target instanceof HTMLDivElement &&
          e.target.classList.contains("modal-overlay")
        ) {
          onClose();
        }
      }}
    >
      <div className="modal-content">
        <h2>Agregar Servicio</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <FormField errorMessage="" label="Nombre:">
            <Input
              type="text"
              placeholder="Nombre del servicio"
              handleInput={(value: string) => {
                setServiceData({ ...serviceData, nombre: value });
              }}
              resetMessage={() => { }}
              value={serviceData.nombre}
            />
          </FormField>
          <FormField errorMessage="" label="Descripcion (opcional):">
            <textarea
              placeholder="Descripción "
              onChange={(e) => {
                setServiceData({ ...serviceData, descripcion: e.target.value });
              }}
              value={serviceData.descripcion ?? ""}
            ></textarea>
          </FormField>
          <FormField errorMessage="" label="Restricciones (opcional):">
            <textarea
              placeholder="Restricciones"
              onChange={(e) => {
                setServiceData({
                  ...serviceData,
                  restricciones: e.target.value,
                });
              }}
              value={serviceData.restricciones ?? ""}
            ></textarea>
          </FormField>
          <FormField errorMessage="" label="Tipo de servicio:">
            <select
              id="service-type"
              value={serviceData.idTipoServicio}
              onChange={(e) => {
                setServiceData({ ...serviceData, idTipoServicio: Number(e.target.value) });
              }}
            >
              {/* <option value="">Servicio a la Habitacion</option> */}
              <option value="1">Alimnetos</option>
              <option value="2">Limpieza</option>
            </select>
          </FormField>

          <FormField errorMessage="" label="Moneda:">
            <select
              id="currency"
              value={serviceData.moneda}
              onChange={(e) =>
                setServiceData({ ...serviceData, moneda: e.target.value })
              }
            >
              <option value="usd">USD</option>
              <option value="bs">BS</option>
            </select>
          </FormField>

          <FormField errorMessage="" label="Precio:">
            <Input
              type="number"
              placeholder="Precio"
              handleInput={(value: string) => {
                setServiceData({ ...serviceData, precio: parseFloat(value) });
              }}
              resetMessage={() => { }}
              value={serviceData.precio.toString()}
            />
          </FormField>

          <FormField errorMessage="" label="Hora de Apertura">
            <Input
              type="time"
              handleInput={(value: string) =>
                setServiceData({ ...serviceData, horaApertura: value })
              }
              resetMessage={() => { }}
              value={serviceData.horaApertura}
            />
          </FormField>
          <FormField label="Hora de Cierre:" errorMessage="">
            <Input
              type="time"
              handleInput={(value: string) => {
                setServiceData({ ...serviceData, horaCierre: value });
              }}
              resetMessage={() => { }}
              value={serviceData.horaCierre}
            />
          </FormField>
          <FormField errorMessage="" label="Disponibilidad:">
            <Input
              type="checkbox"
              handleInput={(value: boolean) => {
                setServiceData({ ...serviceData, disponible: value });
              }}
              resetMessage={() => { }}
              value={serviceData.disponible}
            />
          </FormField>
          <div className="modal-buttons">
            <Button handleClick={handleSave} disabled={false}>
              Guardar
            </Button>
            <Button handleClick={onClose} disabled={false}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;
