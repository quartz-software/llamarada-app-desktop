import React, { useEffect, useState } from "react";
import "./Index.css";
import ServiceModal from "./components/ServiceModal";
import ServiceModalEdit from "./components/ServiceModalEdit";
import ServiceList from "./components/ServiceList";

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);

  const handleAddService = (service: Service) => {
    const newService: Service = { ...service, id: Date.now() };
    fetch("/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newService),
    })
      .then((res) => {
        if (res.status === 200) return res.json();
      })
      .then((data: Service) => {
        console.log(data);
        newService.id = data.id;
        setServices([...services, newService]);
        setIsModalOpen(false);
      });
  };

  const handleEditService = (updatedService: Service) => {
    /* setServices(
      services.map((service) =>
        service.id === updatedService.id ? updatedService : service
      )
    ); */
    setIsEditModalOpen(false);
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const handleOpenEditModal = (service: Service) => {
    setServiceToEdit(service);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    fetch("/api/services")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data: Service[]) => {
        setServices(data);
      });
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
