import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [login, setLogin] = useState(
    JSON.parse(sessionStorage.getItem("login"))
  );
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(JSON.parse(sessionStorage.getItem("authenticated")));
    sessionStorage.setItem("authenticated", authenticated);
    sessionStorage.setItem("login", login);
  }, []);
  return login || authenticated ? <Outlet /> : <Navigate exact to={`/login`} />;
};

export default PrivateRoute;
