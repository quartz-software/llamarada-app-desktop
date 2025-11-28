import { RolUsuario } from "../types/roles";

const useHasRole = (...allowedRoles: RolUsuario[]): boolean => {
  const role = localStorage.getItem("userRole");
  if (role === null && typeof role !== "string") return false;

  return allowedRoles.includes(role as RolUsuario);
};

export default useHasRole;
