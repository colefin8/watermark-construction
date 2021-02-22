import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

function Nav(props) {
  const [routes, setRoutes] = useState([
    {
      name: "Home",
      route: "/",
      current: props.location.pathname === "/" ? true : false,
    },
    {
      name: "Employees",
      route: "/admin",
      current: props.location.pathname === "/admin" ? true : false,
    },
    {
      name: "About",
      route: "/about",
      current: props.location.pathname === "/about" ? true : false,
    },
  ]);

  useEffect(() => {
    setRoutes([
      {
        name: "Home",
        route: "/",
        current: props.location.pathname === "/" ? true : false,
      },
      {
        name: "Employees",
        route: "/admin",
        current: props.location.pathname === "/admin" ? true : false,
      },
      {
        name: "About",
        route: "/about",
        current: props.location.pathname === "/about" ? true : false,
      },
    ]);
  }, [props.location.pathname]);

  const mappedRoutes = routes.map((e, i) => {
    return e.current ? (
      <span key={i}>{e.name}</span>
    ) : (
      <Link key={i} to={e.route}>
        {e.name}
      </Link>
    );
  });
  return <nav>{mappedRoutes}</nav>;
}

export default withRouter(Nav);
