const logout = async (): Promise<boolean> => {
  let result = false;
  const request = await fetch("/api/auth/logout", { method: "POST" });
  if (request.status === 200) {
    localStorage.removeItem("userRole");
    result = true;
  }
  return result;
};

export default logout;
