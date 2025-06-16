import React, { useState, useEffect } from "react";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import FormField from "../../../shared/components/FormField";
import { Servicio } from "@/shared/types/db/servicio";

interface ServiceModalEditProps {
  service: Servicio;
  onClose: () => void;
  onSave: (service: Servicio) => void;
}

const ServiceModalEdit: React.FC<ServiceModalEditProps> = ({
  service,
  onClose,
  onSave,
}) => {
  const [serviceData, setServiceData] = useState<Servicio>(service);
  useEffect(() => {
    setServiceData(service);
  }, [service]);

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
        <h2>Editar Servicio</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormField errorMessage="" label="Nombre:">
            <Input
              type="text"
              placeholder="Nombre del servicio"
              handleInput={(value: string) => {
                setServiceData({ ...serviceData, nombre: value });
              }}
              value={serviceData.nombre}
              resetMessage={() => { }}
            />
          </FormField>
          <FormField errorMessage="" label="Descripcion (opcional):">
            <textarea
              placeholder="Descripción"
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
          <FormField errorMessage="" label="Tipo de Servicio:">
            <select
              id="service-type"
              value={serviceData.idTipoServicio}
              onChange={(e) => {
                setServiceData({ ...serviceData, idTipoServicio: Number(e.target.value) });
              }}
            >
              <option value="1">Alimnetos</option>
              <option value="2">Limpieza</option>
            </select>
          </FormField>

          <FormField label="Moneda:" errorMessage="">
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
          <FormField label="Precio:" errorMessage="">
            <Input
              type="number"
              placeholder="Precio"
              handleInput={(value: string) => {
                setServiceData({ ...serviceData, precio: parseFloat(value) });
              }}
              value={serviceData.precio.toString()}
              resetMessage={() => { }}
            />
          </FormField>
          <FormField label="Hora de Apertura:" errorMessage="">
            <Input
              type="time"
              handleInput={(value: string) =>
                setServiceData({ ...serviceData, horaApertura: value })
              }
              value={serviceData.horaApertura}
              resetMessage={() => { }}
            />
          </FormField>
          <FormField label="Hora de Cierre:" errorMessage="">
            <Input
              type="time"
              handleInput={(value: string) => {
                console.log(value);
                setServiceData({ ...serviceData, horaCierre: value });
              }}
              value={serviceData.horaCierre}
              resetMessage={() => { }}
            />
          </FormField>
          <FormField label="Hora de Cierre:" errorMessage="">
            <input
              type="checkbox"
              checked={serviceData.disponible}
              onChange={(e) =>
                setServiceData({
                  ...serviceData,
                  disponible: e.target.checked,
                })
              }
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

export default ServiceModalEdit;
