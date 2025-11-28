const logout = async (): Promise<boolean> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  let result = false;
  let url = `${API_BASE_URL}/api/auth/logout`
  const token = localStorage.getItem("token")
  const request = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token
    }
  });
  if (request.status === 200) {
    localStorage.removeItem("userRole");
    result = true;
  }
  return result;
};

export default logout;
