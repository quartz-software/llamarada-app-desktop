import React, { useEffect, useState } from "react";
import "./Index.css";
import ServiceModal from "./components/ServiceModal";
import ServiceModalEdit from "./components/ServiceModalEdit";
import ServiceList from "./components/ServiceList";
import { Servicio } from "@/shared/types/db/servicio";
import AlertDelete from "@/shared/components/AlertDelete";
import { toast } from "sonner";

const Services: React.FC = () => {
  const [services, setServices] = useState<Servicio[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Servicio | null>(null);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(0)

  const handleAddService = async (service: Servicio) => {
    try {
      const newService: Servicio = { ...service, id: Date.now() };
      const res = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newService),
      })
      if (res.status === 201) {
        getList()
        toast.success("Servicio agregado")
      } else {
        toast.error("Hubo un error al agregar el servicio")
      }
    } catch (error) {
      console.error(error)
    }
  };

  const handleEditService = async (updatedService: Servicio) => {
    try {
      let url = `/api/services/${updatedService.id}`
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedService),
      })
      if (res.status === 204) {
        getList()
        setIsEditModalOpen(false);
        toast.success("Servio actualizado")
      }
      else {
        toast.error("Hubo un error al actualizar el servicio")
      }
    } catch (error) {
      console.error(error)
    }
  };

  const handleDeleteService = async (id: number) => {
    try {
      let url = `/api/services/${id}`
      const res = await fetch(url, { method: "DELETE", })
      if (res.status === 204) {
        getList()
        setAlertOpen(false);
        toast.success("Servicio eliminado")
      }
    } catch (error) {
      console.error(error)
    }
  };

  const handleOpenEditModal = (service: Servicio) => {
    setServiceToEdit(service);
    setIsEditModalOpen(true);
  };
  const handleOpenAlertDelete = (id: number) => {
    setServiceToDelete(id);
    setAlertOpen(true);
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
    <div>
      <ServiceModal
        onSave={handleAddService}
      />
      {isEditModalOpen && serviceToEdit && (
        <ServiceModalEdit
          service={serviceToEdit}
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          onSave={handleEditService}
        />
      )}
      <AlertDelete
        id={serviceToDelete}
        onDelete={handleDeleteService}
        open={isAlertOpen}
        setOpen={setAlertOpen}
      />
      <ServiceList
        services={services}
        onDelete={handleOpenAlertDelete}
        onEdit={handleOpenEditModal}
      />
    </div>
  );
};

export default Services;
