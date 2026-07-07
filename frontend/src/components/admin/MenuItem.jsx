import { NavLink } from "react-router-dom";
import "./MenuItem.css";

export default function MenuItem({
    to,
    icon,
    children
}) {

    return (

        <NavLink
            to={to}
            end={to === "/admin"}
            className={({ isActive }) =>
                isActive
                    ? "menu-item active"
                    : "menu-item"
            }
        >

            <span className="menu-icon">
                {icon}
            </span>

            <span>
                {children}
            </span>

        </NavLink>

    );

}