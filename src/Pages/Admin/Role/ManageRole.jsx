import React, { useEffect, useState } from "react";
import AdminMenu from "../../../components/AdminComponents/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, useParams } from "react-router-dom";

const ManageRole = () => {
  const [role, setRole] = useState([]);
  const getAllRole = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/role");
      toast.success("Get Database Successfully");
      setRole(res.data);
      console.log(res.data);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/admin/role/${id}`
      );
      console.log(res.data);
      toast.success("Delete Role successfully");
      getAllRole();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRole();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-3">
          <h5>Manage Role</h5>
          <NavLink to="/create-role">
            <button className="btn btn-success m-2">New Role</button>
          </NavLink>
          <div className="w-75">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {role?.map((item, index) => (
                  <>
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>
                        <NavLink to={`/update-role/${item._id}`}>
                        <button className="btn btn-primary">Edit</button>
                        </NavLink>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteCategory(item._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRole;
