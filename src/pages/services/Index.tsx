import React, { useEffect, useState } from "react";
import "./Index.css";
import ServiceModal from "./components/ServiceModal";
import ServiceModalEdit from "./components/ServiceModalEdit";
import ServiceList from "./components/ServiceList";
import { Servicio } from "@/shared/types/db/servicio";

const Services: React.FC = () => {
  const [services, setServices] = useState<Servicio[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Servicio | null>(null);

  const handleAddService = async (service: Servicio) => {
    try {
      const newService: Servicio = { ...service, id: Date.now() };
      await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newService),
      })
      getList()
      // setServices([...services, newService]);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error)
    }
  };

  const handleEditService = async (updatedService: Servicio) => {
    try {
      let url = `/api/services/${updatedService.id}`
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedService),
      })
      getList()
      // setServices(
      //   services.map((service) =>
      //     service.id === updatedService.id ? updatedService : service
      //   )
      // );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error(error)
    }
  };

  const handleDeleteService = async (id: number) => {
    try {
      let url = `/api/services/${id}`
      await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      })
      getList()
      // setServices(services.filter((service) => service.id !== id));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error(error)
    }
  };

  const handleOpenEditModal = (service: Servicio) => {
    setServiceToEdit(service);
    setIsEditModalOpen(true);
  };
  async function getList() {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="services-container">
      <h1>Gestión de Servicios</h1>
      <button
        className="add-service-button"
        onClick={() => setIsModalOpen(true)}
      >
        Agregar Servicio
      </button>
      <ServiceList
        services={services}
        onDelete={handleDeleteService}
        onEdit={handleOpenEditModal}
      />
      {isModalOpen && (
        <ServiceModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddService}
        />
      )}
      {isEditModalOpen && serviceToEdit && (
        <ServiceModalEdit
          service={serviceToEdit}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditService}
        />
      )}
    </div>
  );
};

export default Services;
