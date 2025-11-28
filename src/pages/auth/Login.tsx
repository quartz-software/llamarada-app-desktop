import Llamarada from "./assets/LLamarada.svg";
import { Button } from "../../shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserRole from "../../shared/hooks/useUserRole";
import { useForm } from "react-hook-form";
import { UsuarioLoginSchema } from "@/shared/schemas/models/usuario";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";

const Login = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [formError, setFormError] = useState("");
  const { fetchRole } = useUserRole();
  const navigate = useNavigate();

  type AuthType = z.infer<typeof UsuarioLoginSchema>
  const form = useForm<AuthType>({
    resolver: zodResolver(UsuarioLoginSchema),
    defaultValues: {
      correo: "",
      password: "",
    }
  })
  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form

  const postData = async (data: AuthType) => {
    try {
      const url = `${API_BASE_URL}/api/auth/login`;
      const cont = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: data.correo,
          password: data.password,
        }),
      };
      const res = await fetch(url, cont)
      const resData = await res.json()
      if (res.status === 401) {
        setError("correo", {
          type: "manual",
          message: "",
        });
        setError("password", {
          type: "manual",
          message: "",
        });
        setFormError("Correo o contraseña incorrecta");
      } else if (res.status == 200) {

        navigate("/home");
        localStorage.setItem("token", resData.token)
        const rol = await fetchRole();
        if (rol === "administrador" || rol === "recepcionista") {
          navigate("/home");
        } else {
          setFormError("Acceso no permitido");
        }
      }

    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="flex w-full min-h-[100vh] justify-center items-center">
      <Card className="w-full max-w-sm h-fit">
        <CardHeader className="space-y-6">
          <h1 className="text-center text-3xl font-extrabold tracking-tight text-balance">
            Hotel Llamarada
          </h1>
          <div className="flex w-full justify-center">
            <img className="w-40" src={Llamarada} alt="LLamarada" />
          </div>
          <CardTitle>Inicia Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(postData)} className="space-y-6">
              <FormField
                control={control}
                name="correo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Correo" type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Contraseña" type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-destructive">{formError}</p>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Cargando..." : "Iniciar Sesión"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
