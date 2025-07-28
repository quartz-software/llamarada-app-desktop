import React, { useState } from "react";
import { Servicio } from "@/shared/types/db/servicio";
import { z } from "zod";
import { ServicioCreateSchema } from "@/shared/schemas/models/servicio";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Switch } from "@/shared/components/ui/switch";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

interface ServiceModalProps {
  onSave: (service: Servicio) => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ onSave }) => {
  const [open, setOpen] = useState(false)
  type ServicioType = z.infer<typeof ServicioCreateSchema>

  const form = useForm<ServicioType>({
    resolver: zodResolver(ServicioCreateSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      restricciones: "",
      precio: 0.00,
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
  const handleSave = (data: ServicioType) => {
    onSave({ id: 0, ...data });
    reset();
    setOpen(false)
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          Agregar Servicio
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añade un nuevo servicio</DialogTitle>
          <DialogDescription>
            Añade un nuevo servicio. Haz clic en "Agregar Servicio" para guardar.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <ScrollArea className="max-h-[80vh]">
            <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
              <FormField
                control={control}
                name="disponible"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-left">Disponible</FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

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
                      <Select
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccione el tipo de servicio" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* <SelectItem value="">Servicio a la Habitacion</SelectItem> */}
                          <SelectItem value="1">Alimnetos</SelectItem>
                          <SelectItem value="2">Limpieza</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccione una moneda" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="usd">USD</SelectItem>
                          <SelectItem value="bs">BS</SelectItem>
                        </SelectContent>
                      </Select>
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
                        <Input
                          type="number"
                          placeholder="Precio"
                          value={field.value?.toFixed(2) ?? ""}
                          min={0}
                          step="0.01"
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            field.onChange(isNaN(val) ? 0 : val);
                          }}
                          onBlur={(e) => {
                            const val = parseFloat(e.target.value);
                            if (!isNaN(val)) {
                              field.onChange(parseFloat(val.toFixed(2)));
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 items-center gap-4">
                <FormField
                  control={control}
                  name="horaApertura"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-2">
                      <FormLabel className="text-left">Hora Apertura</FormLabel>
                      <div>
                        <FormControl>
                          <Input {...field}
                            type="time"
                            step="60"
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:appearance-none" />
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
                    <FormItem className="grid grid-cols-2">
                      <FormLabel className="text-left">Hora Cierre</FormLabel>
                      <div>
                        <FormControl>
                          <Input {...field}
                            type="time"
                            className="[&::-webkit-calendar-picker-indicator]:appearance-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit">
                  Guardar servicio
                </Button>
              </div>
            </form>
          </ScrollArea>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;
