import { Link, useLocation } from "react-router-dom";

import {
  faBook,
  faBorderAll,
  faBox,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSelector } from "react-redux";
import "./style.css";

const LINKS = [
  {
    to: "/dashboard",
    title: "Dashboard",
    icon: faBorderAll,
  },
  {
    to: "/users",
    title: "Users",
    icon: faUser,
  },
  {
    to: "/genre",
    title: "Genre",
    icon: faUser,
  },
  {
    to: "/albums",
    title: "Albums",
    icon: faBook,
  },
  {
    to: "/paid-albums",
    title: "Paid Albums",
    icon: faBook,
  },
  {
    to: "/subscriptions",
    title: "Subscriptions",
    icon: faUser,
  },
  {
    to: "/packages",
    title: "Packages",
    icon: faBox,
  },
  {
    to: "/snp-videos",
    title: "SNP Videos",
    icon: faBox,
  },
];

export const Sidebar = (props) => {
  const { user } = useSelector((state) => state.authSlice);
  const location = useLocation();
  const ROUTES = LINKS;

  return (
    <div className={`sidebar ${props.sideClass}`} id="sidebar">
      <ul className="list-unstyled">
        {ROUTES.map((item) => (
          <li key={item.to} className="sidebar-li">
            <Link
              className={`sideLink ${
                location.pathname.includes(item.to) ? "active" : ""
              }`}
              to={item.to}
            >
              <span className="sideIcon">
                <FontAwesomeIcon icon={item.icon} />
              </span>
              <span className="sideLinkText">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
