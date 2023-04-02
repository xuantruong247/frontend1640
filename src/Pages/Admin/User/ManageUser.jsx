import React, { useEffect, useState } from "react";
import AdminMenu from "../../../components/AdminComponents/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, useParams } from "react-router-dom";

const ManageUser = () => {
  const [role, setRole] = useState([]);
  const getAllUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/user");
      toast.success("Get Database Successfully");
      setRole(res.data);
      console.log(res.data);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/admin/user/${id}`
      );
      console.log(res.data);
      toast.success("Delete Role successfully");
      getAllUser();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-3">
          <h5>Manage User</h5>
          <NavLink to="/create-user">
            <button className="btn btn-success m-2">New User</button>
          </NavLink>
          <div className="w-75">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>

                </tr>
              </thead>
              <tbody>
                {role?.map((item, index) => (
                  <>
                    <tr key={index}>
                      <td>{item.username}</td>
                      <td>{item?.profile?.phone}</td>
                      <td>{item?.profile?.email}</td>
                      <td>{item?.role?.name}</td>
                      <td>
                        <NavLink to={`/update-user/${item._id}`}>
                        <button className="btn btn-primary">Edit</button>
                        </NavLink>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteUser(item._id);
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

export default ManageUser;
