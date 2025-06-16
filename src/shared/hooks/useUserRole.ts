import { UserRole } from "../types/UserRole";

const useUserRole = () => {
  const fetchRole = async (): Promise<UserRole | null> => {
    try {
      const response = await fetch("/api/auth/role", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data: UserRole = await response.json();
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
