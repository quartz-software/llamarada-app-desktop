import {
  faBoxes,
  faCalendarCheck,
  faDollarSign,
  faDoorClosed,
  faHome,
  // faPlusCircle,
  faSignOut,
  faTags,
  // faTasks,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Layout.css";
import logout from "./hooks/useLogout";
import useHasRole from "./hooks/useHasRole";

const Layout = () => {
  const isAdmin = useHasRole("administrador");
  const navigate = useNavigate();
  const location = useLocation();

  const listItems = [
    {
      icon: faHome,
      path: "/home",
      label: "Inicio",
      show: true,
    },
    {
      icon: faTools,
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
      icon: faDoorClosed,
      path: "/rooms",
      label: "Habitaciones",
      show: isAdmin,
    },
    {
      icon: faTags,
      path: "/promotions",
      label: "Promociones",
      show: isAdmin,
    },
    {
      icon: faDollarSign,
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
      icon: faCalendarCheck,
      path: "/bookings",
      label: "Reservaciones",
      show: true,
    },
    {
      icon: faBoxes,
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
    <div className="app_container">
      <nav className="navbar">
        <ul className="navbar__list">
          {listItems.map((item, index) => {
            return (
              item.show && (
                <li
                  key={index}
                  className={`navbar__item ${
                    isActiveLink(item.path) ? "active" : ""
                  }`}
                >
                  <Link className="navbar__link" to={item.path}>
                    <i>
                      <FontAwesomeIcon icon={item.icon} />
                    </i>
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            );
          })}
        </ul>
        <ul className="navbar__list">
          <li className="navbar__item">
            <button
              className="navbar__link navbar__link--danger"
              onClick={handleLogout}
            >
              <i>
                <FontAwesomeIcon icon={faSignOut} />
              </i>
              <span>Salir</span>
            </button>
          </li>
        </ul>
      </nav>
      <div id="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
