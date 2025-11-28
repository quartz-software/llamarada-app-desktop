import { FC } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClienteCreateSchema } from "@/shared/schemas/models/cliente";
import { UsuarioCreateSchema } from "@/shared/schemas/models/usuario";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
type ModalClienteProps = {
  reloadClients: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const Cliente_Formulario_Modal: FC<ModalClienteProps> = ({ open, setOpen, reloadClients }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token")

  const ClienteUsuarioCreateSchema = z.object({
    cliente: ClienteCreateSchema,
    usuario: UsuarioCreateSchema,
  })
  type ClienteType = z.infer<typeof ClienteUsuarioCreateSchema>

  const form = useForm<ClienteType>({
    resolver: zodResolver(ClienteUsuarioCreateSchema),
    defaultValues: {
      cliente: {
        dni: "",
        nombre1: "",
        nombre2: "",
        apellido1: "",
        apellido2: "",
        telefono: "",
        pais: "",
        idUsuario: -1,
      },
      usuario: {
        correo: "",
        password: "",
      }
    }
  })
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting }
  } = form

  const onCreateClient = async (data: ClienteType) => {
    try {
      let url = `${API_BASE_URL}/api/clients`;
      let cont = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify(data),
      };

      const res = await fetch(url, cont)
      if (res.status === 201) {
        toast.success("Cliente agregado correcatamente")
        setOpen(false)
        reset()
        reloadClients()
      }
      else {
        toast.error("Hubo un problema al agregar al cliente")
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Añade un nuevo cliente</DialogTitle>
          <DialogDescription>
            Añade un nuevo cliente. Haz clic en "Agregar cliente" para guardar.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onCreateClient)} className="space-y-4">
            <FormField
              control={control}
              name="cliente.dni"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">CI</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input {...field} type="text" placeholder="Celula de Identidad" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="cliente.nombre1"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Nombre</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Nombre cliente"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="cliente.apellido1"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Apellido</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Apellido cliente"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="cliente.telefono"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Telefono</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="Numero de telefono"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="usuario.correo"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Correo</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input {...field} type="email" placeholder="Usuario cliente" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="cliente.pais"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">País</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input {...field} type="text" placeholder="Pais de nacimiento" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">
                {!isSubmitting ? "Agregar cliente" : "Enviando..."}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>

  );
};

export default Cliente_Formulario_Modal;
