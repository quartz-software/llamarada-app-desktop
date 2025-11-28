import { RolUsuario } from "../types/roles";

const useUserRole = () => {
  const fetchRole = async (): Promise<RolUsuario | null> => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const token = localStorage.getItem("token")
    try {
      let url = `${API_BASE_URL}/api/auth/role`
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: "Bearer " + token
        }
      });

      if (response.ok) {
        const data: RolUsuario = await response.json();
        localStorage.setItem("userRole", data);
        return data;
      } else {
        throw new Error("No autenticado o rol no disponible");
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem("userRole");
      return null;
    }
  };
  return { fetchRole };
};

export default useUserRole;
