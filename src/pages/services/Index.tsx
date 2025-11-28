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

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token")


  const handleAddService = async (service: Servicio) => {
    try {
      let url = `${API_BASE_URL}/api/services`
      const newService: Servicio = { ...service, id: Date.now() };
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
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
      let url = `${API_BASE_URL}/api/services/${updatedService.id}`
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
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
      let url = `${API_BASE_URL}/api/services/${id}`
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token
        }
      })
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
      let url = `${API_BASE_URL}/api/services`
      const res = await fetch(url, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
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
