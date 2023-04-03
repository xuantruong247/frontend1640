import moment from "moment";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import QAMenu from "../../../components/QAComponents/QAMenu";
import { toast } from "react-toastify";
import axios from "axios";

const ManageSubQA = () => {
  const [submissionQA, setsSubmisionQA] = useState([]);

  const getAllSubQA = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/submission");
      toast.success("Get db successfully");
      console.log(res.data);
      setsSubmisionQA(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

const deleteSubQA = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:8080/admin/submission/${id}`)
    console.log(res.data);
    toast.success("Delete Sub successfully")
    getAllSubQA()
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong")
  }
}

  useEffect(() => {
    getAllSubQA();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <QAMenu />
        </div>
        <div className="col-md-9">
          <h5>Manage Submission</h5>
          <NavLink to="/create-sub-QA">
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
                {submissionQA?.map((item, index) => (
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
                        <NavLink to={`/update-sub-QA/${item._id}`}>
                          <button className="btn btn-primary">Edit</button>
                        </NavLink>
                        <button
                          className="btn btn-danger ml-2"
                          onClick={() => {
                            deleteSubQA(item._id);
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

export default ManageSubQA;
