import React from "react";
import { Servicio } from "@/shared/types/db/servicio";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Pen, Trash } from "lucide-react";

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
    <div className="rounded-lg border my-5">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-muted">
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Horario</TableHead>
            <TableHead>Disponibilidad</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.nombre}</TableCell>
              <TableCell>{ServiceTypes[service.idTipoServicio - 1]}</TableCell>
              <TableCell>{service.precio} {service.moneda.toUpperCase()}</TableCell>
              <TableCell>{service.horaApertura} - {service.horaCierre}</TableCell>
              <TableCell>
                <Badge variant={"default"} className={service.disponible ? "bg-green-500" : "bg-destructive"}>
                  {service.disponible ? "Disponible" : "No Disponible"}
                </Badge>
              </TableCell>
              <TableCell className="flex items-center justify-end gap-2">
                <Button
                  variant="default"
                  onClick={() => onEdit(service)}>
                  <Pen />
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => onDelete(service.id)}
                >
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ServiceList;
