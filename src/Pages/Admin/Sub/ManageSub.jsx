import React, { useEffect, useState } from "react";
import AdminMenu from "../../../components/AdminComponents/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import moment from "moment";

const ManageSub = () => {
  const [submission, setSubmission] = useState([]);
  const getAllSub = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/submission");
      toast.success("Get Database Successfully");
      setSubmission(res.data);
      console.log(res.data);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const deleteSub = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/admin/submission/${id}`
      );
      console.log(res.data);
      toast.success("Delete Submission successfully");
      getAllSub();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSub();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h5>Manage Submission</h5>
          <NavLink to="/create-sub-admin">
            <button className="btn btn-success m-2">New Submission</button>
          </NavLink>
          <div className="w-75">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Dealine 1</th>
                  <th scope="col">Dealine 2</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {submission?.map((item, index) => (
                  <>
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>
                        {moment(item.deadline_1).format(
                          "DD - MM - YYYY h:mm a"
                        )}
                      </td>
                      <td>
                        {moment(item.deadline_2).format(
                          "DD - MM - YYYY h:mm a"
                        )}
                      </td>
                      <td>
                        <NavLink to={`/update-sub/admin/${item._id}`}>
                          <button className="btn btn-primary">Edit</button>
                        </NavLink>
                        <button
                          className="btn btn-danger ml-2"
                          onClick={() => {
                            deleteSub(item._id);
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

export default ManageSub;
