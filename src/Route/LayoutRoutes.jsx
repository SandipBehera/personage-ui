import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { managerRoutes, routes, userRoutes } from "./Routes";
import AppLayout from "../Layout/Layout";

const LayoutRoutes = () => {
  const userType = sessionStorage.getItem("user_type");
  return (
    <>
      <Routes>
        {userType === "admin"
          ? routes.map(({ path, Component }, i) => (
              <Fragment key={i}>
                <Route element={<AppLayout />} key={i}>
                  <Route path={path} element={Component} />
                </Route>
              </Fragment>
            ))
          : userType === "Manager" ||
            userType === userType.match(/Head.*/)?.input
          ? managerRoutes.map(({ path, Component }, i) => (
              <Fragment key={i}>
                <Route element={<AppLayout />} key={i}>
                  <Route path={path} element={Component} />
                </Route>
              </Fragment>
            ))
          : userRoutes.map(({ path, Component }, i) => (
              <Fragment key={i}>
                <Route element={<AppLayout />} key={i}>
                  <Route path={path} element={Component} />
                </Route>
              </Fragment>
            ))}
      </Routes>
    </>
  );
};

export default LayoutRoutes;
