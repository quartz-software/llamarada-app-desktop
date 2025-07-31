import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import "./Layout.css";
import logout from "./hooks/useLogout";
import useHasRole from "./hooks/useHasRole";
import Llamarada from "./assets/LLamarada.svg";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Bed, CalendarCheck, ConciergeBell, DollarSign, Home, LogOut, ShoppingBag } from "lucide-react";
import { useState } from "react";

const Layout = () => {
  const isAdmin = useHasRole("administrador");
  const navigate = useNavigate();
  const location = useLocation();
  const [openSlidebar, setOpenSlidebar] = useState(true)
  const [currentPage, setCurrentPage] = useState("Inicio")

  const listItems = [
    {
      icon: Home,
      path: "/home",
      label: "Inicio",
      show: true,
    },
    {
      icon: ConciergeBell,
      path: "/services",
      label: "Servicios",
      show: isAdmin,
    },
    /* {
      icon: faTasks,
      path: "/tasks",
      label: "Tareas",
      show: true,
    }, */
    {
      icon: Bed,
      path: "/rooms",
      label: "Habitaciones",
      show: isAdmin,
    },
    /* {
      icon: faTags,
      path: "/promotions",
      label: "Promociones",
      show: isAdmin,
    }, */
    {
      icon: DollarSign,
      path: "/rates",
      label: "Tarifas",
      show: isAdmin,
    },
    /* {
      icon: faPlusCircle,
      path: "/addservices",
      label: "Solicitudes",
      show: true,
    }, */
    {
      icon: CalendarCheck,
      path: "/bookings",
      label: "Reservaciones",
      show: true,
    },
    {
      icon: ShoppingBag,
      path: "/stock",
      label: "Inventario",
      show: isAdmin,
    },
  ];
  async function handleLogout(): Promise<void> {
    const loggedout = await logout();
    if (loggedout == true) navigate("/login");
  }
  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <SidebarProvider open={openSlidebar} onOpenChange={setOpenSlidebar}>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem className="h-10 flex gap-4 items-center">
              <img
                src={Llamarada}
                alt="Llamarada"
                className="h-full"
              />
              {openSlidebar &&
                <span className="font-bold text-lg text-nowrap">Hotel Llamarada</span>
              }
              {/* <SidebarMenuButton className="h-12">
              </SidebarMenuButton> */}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Opciones</SidebarGroupLabel>
            <SidebarMenu>
              {listItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild
                    className={`${isActiveLink(item.path) ? "bg-primary/90" : ""} hover:bg-primary/60`}
                  >
                    <Link to={item.path} onClick={() => { setCurrentPage(item.label) }}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="bg-destructive hover:bg-destructive/80"
                onClick={handleLogout}
              >
                <LogOut />
                <span>Salir</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col items-center w-full">
          <header className="flex w-full gap-6 p-4">
            <SidebarTrigger />
            <h1 className="font-bold">{currentPage}</h1>
          </header>
          <div id="content" className="w-full max-w-5xl p-4 min-h-full">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider >
  );
};

export default Layout;
