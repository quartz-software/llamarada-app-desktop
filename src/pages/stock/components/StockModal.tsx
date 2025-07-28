import { FC, useState } from "react";
import { z } from "zod";
import { StockCreateSchema } from "@/shared/schemas/models/stock";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Stock } from "@/shared/types/db/stock";

interface StockModalProps {
  onSave: (stock: Stock) => void;
}

const StockModal: FC<StockModalProps> = ({ onSave }) => {
  const [open, setOpen] = useState(false);

  type StockType = z.infer<typeof StockCreateSchema>;

  const form = useForm<StockType>({
    resolver: zodResolver(StockCreateSchema),
    defaultValues: {
      nombre: "",
      cantidad: 0,
      precio: 0.0,
      unidadMedida: "",
      idCategoria: 0
    }
  });

  const { handleSubmit, control, reset } = form;

  const handleSave = (data: StockType) => {
    onSave({ id: 0, ...data });
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Agregar Producto</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añade un nuevo producto al invetario</DialogTitle>
          <DialogDescription>
            Completa los datos y haz clic en "Guardar" para registrar el producto.
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
                      <Input {...field} placeholder="Nombre del producto" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="cantidad"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-left">Cantidad</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        value={field.value?.toString()}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
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
                      <Input
                        type="number"
                        placeholder="Precio"
                        value={field.value?.toFixed(2)}
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

            <FormField
              control={control}
              name="unidadMedida"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-left">Unidad de medida</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input {...field} placeholder="Ej: kg, lt, u, etc." />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="idCategoria"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-left">Categoría</FormLabel>
                  <div className="col-span-3">
                    <Select onValueChange={(val) => field.onChange(Number(val))}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccione una categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Limpieza</SelectItem>
                        <SelectItem value="2">Alimentos</SelectItem>
                        <SelectItem value="3">Mantenimiento</SelectItem>
                        {/* Puedes cargar dinámicamente si lo deseas */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Guardar Stock</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default StockModal;
