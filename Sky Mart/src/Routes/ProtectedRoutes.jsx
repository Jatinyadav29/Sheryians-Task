import React, { useContext } from "react";
import { MyStore } from "../Context/MyContext";
import { Navigate } from "react-router";

const ProtectedRoutes = ({ children }) => {
  let { currentUser } = useContext(MyStore);

  if (currentUser === null) {
    return <Navigate to={"/register"} />;
  }

  return children;
};

export default ProtectedRoutes;
