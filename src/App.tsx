import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
// import { useState } from "react";

import Layout from "./shared/Layout";

import Home from "./pages/home/Home";
import AddServices from "./pages/addservices/Index";
import Bookings from "./pages/bookings/Index";
import BookingCreateForm from "./pages/bookings/BookingCreateForm";
import Login from "./pages/auth/Login";
import Services from "./pages/services/Index";
import Stock from "./pages/stock/Index";
import Tasks from "./pages/tasks/Index";
import RoomRates from "./pages/RoomRate/RoomRates";
// import useUserRole from "./pages/common/hooks/useUserRole";
import Rooms from "./pages/rooms/Index";
import RoomRatesForm from "./pages/RoomRate/RoomRatesForm";
import Habitaciones_formulario from "./pages/rooms/Habitaciones_formulario";
import { Toaster } from "./shared/components/ui/sonner";
import BookingDetailsForm from "./pages/bookings/BookingDetailsForm";
// import { useEffect, useState } from "react";
// import useUserRole from "./shared/hooks/useUserRole";
// import { UserRole } from "./shared/types/UserRole";

function App() {
  // const [isAuth, setIsAuth] = useState<boolean | null>(null);
  // const [role, setRole] = useState<UserRole | null>(null);
  // const { fetchRole } = useUserRole();

  /* useEffect(() => {
    fetch("/api/auth/check", { method: "GET", credentials: "include" })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        setIsAuth(false);
      })
      .then(async (data: { valid: boolean }) => {
        setIsAuth(data.valid);
        setRole(await fetchRole());
      })
      .catch(() => {
        setIsAuth(false);
      });
  }, [fetchRole]); */
  // if (isAuth === null) {
  // return <div>Loading...</div>;
  // }

  return (
    <>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                // isAuth &&
                // (role === "administrador" || role === "recepcionista") ? (
                // <Navigate to="/home" />
                // ) : (
                <Navigate to="/login" />
                // )
              }
            />

            <Route path="home" element={<Home />} />
            <Route path="addservices" element={<AddServices />} />
            <Route path="bookings">
              <Route index element={<Bookings />} />
            <Route path="create" element={<BookingCreateForm />} />
            <Route path="details/:id" element={<BookingDetailsForm />} />
          </Route >
            <Route path="rates">
              <Route index element={<RoomRates />} />
              <Route path="edit" element={<RoomRatesForm />} />
            </Route>
            <Route path="rooms">
              <Route index element={<Rooms />} />
              <Route path="form" element={<Habitaciones_formulario />} />
            </Route>
            <Route path="services" element={<Services />} />
            <Route path="stock" element={<Stock />} />
            <Route path="tasks" element={<Tasks />} />
          </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
