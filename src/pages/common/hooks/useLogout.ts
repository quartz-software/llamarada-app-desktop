const useLogout = async (): Promise<boolean> => {
  let result = false;
  let request = await fetch("/api/auth/logout", { method: "POST" });
  if (request.status === 200) {
    localStorage.removeItem("userRole");
    result = true;
  }
  return result;
};

export default useLogout;
