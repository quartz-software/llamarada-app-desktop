const useHasRole = (...allowedRoles: UserRole[]): boolean => {
  const role = localStorage.getItem("userRole");
  if (role === null && typeof role !== "string") return false;

  return allowedRoles.includes(role as UserRole);
};

export default useHasRole;
