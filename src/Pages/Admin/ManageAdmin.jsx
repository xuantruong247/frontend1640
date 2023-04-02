import React from "react";
import AdminMenu from "../../components/AdminComponents/AdminMenu";
import Dashboard from "../Dashboard/Dashboard";

const ManageAdmin = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
            <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;
