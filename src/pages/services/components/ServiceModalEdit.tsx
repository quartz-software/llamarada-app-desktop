import React, { useEffect } from "react";
import { Servicio } from "@/shared/types/db/servicio";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { z } from "zod";
import { ServicioUpdateSchema } from "@/shared/schemas/models/servicio";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";

interface ServiceModalEditProps {
  service: Servicio;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: (service: Servicio) => void;
}

const ServiceModalEdit: React.FC<ServiceModalEditProps> = ({
  service,
  open,
  setOpen,
  onSave,
}) => {
  type ServicioType = z.infer<typeof ServicioUpdateSchema>

  const form = useForm<ServicioType>({
    resolver: zodResolver(ServicioUpdateSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      restricciones: "",
      idTipoServicio: 1,
      moneda: "usd",
      precio: 0,
      horaApertura: "08:00",
      horaCierre: "18:00",
      disponible: false,
    }
  })
  const {
    handleSubmit,
    control,
    reset,
  } = form
  useEffect(() => {
    if (service) {
      reset({
        nombre: service.nombre,
        descripcion: service.descripcion,
        restricciones: service.restricciones,
        idTipoServicio: service.idTipoServicio,
        moneda: service.moneda,
        precio: service.precio,
        horaApertura: service.horaApertura,
        horaCierre: service.horaCierre,
        disponible: service.disponible,
      })
    };
  }, [service, form]);
  if (!service) {
    return <></>
  }
  const handleSave = (data: ServicioType) => {
    onSave({
      id: service.id,
      nombre: data.nombre ?? "",
      descripcion: data.descripcion ?? "",
      restricciones: data.restricciones ?? "",
      idTipoServicio: data.idTipoServicio ?? 1,
      moneda: data.moneda ?? "usd",
      precio: data.precio ?? 0,
      horaApertura: data.horaApertura ?? "08:00",
      horaCierre: data.horaCierre ?? "18:00",
      disponible: data.disponible ?? false,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añade un nuevo servicio</DialogTitle>
          <DialogDescription>
            Añade un nuevo servicio. Haz clic en "Agregar Servicio" para guardar.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
            <FormField
              control={control}
              name="nombre"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-left">Nombre</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input {...field} type="text" placeholder="Nombre" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="descripcion"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-left">Descripcion</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Textarea {...field} placeholder="Descripcion" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="restricciones"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-left">Restricciones (opcional)</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Textarea {...field} placeholder="Restricciones" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="idTipoServicio"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-left">Tipo del servicio</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <select
                        id="service-type"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        {/* <option value="">Servicio a la Habitacion</option> */}
                        <option value="1">Alimnetos</option>
                        <option value="2">Limpieza</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="moneda"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-left">Moneda</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <select
                        id="currency"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="usd">USD</option>
                        <option value="bs">BS</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="precio"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-left">Precio</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input {...field} type="number" placeholder="Precio" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="horaApertura"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-left">Hora Apertura</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input {...field} type="time" placeholder="Precio" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="horaCierre"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-left">Hora Cierre</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input {...field} type="time" placeholder="Precio" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="disponible"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-left">Disponible</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input checked={field.value} type="checkbox" onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">
                Guardar servicio
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModalEdit;
