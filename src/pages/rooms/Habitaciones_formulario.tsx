import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import RoomImage from "./components/RoomImage";
import { Habitacion } from "@/shared/types/db/habitacion";
import { z } from "zod";
import { HabitacionCreateSchema } from "@/shared/schemas/models/habitacion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { ImagenHabitacion } from "@/shared/types/db/imagen-habitacion";
import { toast } from "sonner";


const Habitaciones_formulario = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const idHabitacion = params.get("id");
  const [isEditing, setIsEditing] = useState(idHabitacion == null ? false : true)

  type HabitacionType = z.infer<typeof HabitacionCreateSchema>
  const form = useForm<HabitacionType>({
    resolver: zodResolver(HabitacionCreateSchema),
    defaultValues: {
      numeroHabitacion: "",
      capacidad: 0,
      descripcion: "",
      idTipoHabitacion: 1,
      idEstadoHabitacion: 1,
    }
  })
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting }
  } = form

  const [roomData, setRoomData] = useState<ImagenHabitacion[]>([]);

  //const [RoomImages, setRoomImages] = useState<RoomImage[]>([])

  async function getData() {
    try {
      let url = `/api/rooms/${idHabitacion}`;
      const res = await fetch(url)
      const data = await res.json()
      reset({
        numeroHabitacion: data.numeroHabitacion,
        capacidad: data.capacidad,
        descripcion: data.descripcion,
        idEstadoHabitacion: data.idEstadoHabitacion,
        idTipoHabitacion: data.idTipoHabitacion,
      });
    } catch (error) {
      navigate("/rooms")
      console.error(error)
    }
  }

  const postData = async (data: HabitacionType) => {
    try {
      const formData = new FormData();
      formData.append("numeroHabitacion", data.numeroHabitacion);
      formData.append("capacidad", data.capacidad.toString());
      formData.append("idEstadoHabitacion", data.idEstadoHabitacion.toString());
      formData.append("idTipoHabitacion", data.idTipoHabitacion.toString());
      // formData.append("pricePerNight", data.pricePerNight);
      formData.append("descripcion", data.descripcion ?? "");

      const imageMetaData: {
        id: number | null;
        index: number;
        name: string;
        type: string;
        url?: string;
      }[] = [];
      roomData.forEach((image, index) => {
        if (image.url) {
          formData.append("imagenes", image.url);
        }

        imageMetaData.push({
          index,
          name: "",
          type: image.tipoImagen,
          url: image.url,
          id: image.id ? image.id : null,
        });
      });

      formData.append("images", JSON.stringify(imageMetaData));

      const id = isEditing ? idHabitacion : null;
      let url = `/api/rooms/${id ? id : ""}`;

      let cont = {
        method: id == null ? "POST" : "PUT",
        body: formData,
      };

      const res = await fetch(url, cont)
      const status = res.status

      if (status === 201) {
        toast.success("Habitacion agregada correctamente")
        navigate("/rooms");
      }
      else if (status === 204) {
        toast.success("Habitacion actualizada correctamente")
        navigate("/rooms");
      }
      else {
        toast.error("Hubo un problema")
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (idHabitacion != null) {
      getData();
    }
  }, []);
  return (
    <div className="flex items-center flex-col">
      <h1 className="font-bold text-2xl mt-8">Habitación</h1>
      <Form {...form}>
        <form
          className="space-y-6 min-w-96 mt-6"
          onSubmit={handleSubmit(postData)}
        >
          <FormField
            control={control}
            name="numeroHabitacion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numero de Habiacion:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Habitacion"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="capacidad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacidad:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Cantidad de personas"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="idEstadoHabitacion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado de la habitacion:</FormLabel>
                <FormControl>
                  <select
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <option value="7">No disponible</option>
                    <option value="1">Disponible</option>
                    <option value="2">Ocupado</option>
                    <option value="6">Mantemiento</option>
                    <option value="5">Limpieza</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="idTipoHabitacion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de la habitacion:</FormLabel>
                <FormControl>
                  <select
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <option value="1">Normal</option>
                    <option value="2">Suite</option>
                    <option value="3">Premium</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField label="Precio" errorMessage="">
          <Input
            type="number"
            placeholder="Precio"
            handleInput={(value: string) => {
              setRoomData({ ...roomData, pricePerNight: value });
            }}
            value={roomData.pricePerNight}
            resetMessage={() => { }}
          />
        </FormField> */}
          <FormField
            control={control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripcion (opcional):</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Descripcion de la habitacion"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <div>
          <h2>Promociones</h2>
          <div className="promotion__select">
            <select
              onChange={(e) => {
                console.log(e);
              }}
            >
              <option value="">Seleccione una promocion</option>
            </select>
            <Button handleClick={() => { }}>Añadir</Button>
          </div>
        </div>
        <div className="form__div--row">
          <div className="form__title-imgs">
            <h2>Imagenes</h2>
            <Button
              disabled
              handleClick={() => {
                setRoomData({
                  ...roomData,
                  imagenes: [
                    ...(roomData.imagenes!),
                    {
                      id: -1,
                      url: "",
                      tipoImagen: "plano",
                      descripcion: "",
                      idHabitacion: roomData.id
                    },
                  ],
                });
              }}
            >
              Añadir
            </Button>
          </div>
          {roomData.imagenes && roomData.imagenes.length == 0 ? (
            <div className="div--msg-nd">No tiene imagenes</div>
          ) : (
            <div className="div-images">
              {roomData.imagenes!.map((item, index) => {
                return (
                  <RoomImage
                    key={index}
                    model={{
                      name: "",
                      type: item.tipoImagen,
                      path: item.url,
                    }}
                    onChange={(file) => {
                      const acFields = [...roomData.imagenes!];
                      acFields[index].file = file;
                      setRoomData({ ...roomData, imagenes: acFields });
                    }}
                    onDelete={() => {
                      const acFields = [...roomData.imagenes!];
                      acFields.splice(index, 1);
                      setRoomData({ ...roomData, imagenes: acFields });
                    }}
                  ></RoomImage>
                );
              })}
            </div>
          )}
        </div> */}
          <div className="flex justify-end gap-6">
            <Button type="submit">
              Guardar
            </Button>
            <Button
              type="button"
              onClick={() => navigate("/rooms")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Habitaciones_formulario;
