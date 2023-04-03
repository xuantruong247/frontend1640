import React, { useEffect, useState } from "react";
import AdminMenu from "../../../components/AdminComponents/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const ManageIdea = () => {
  const [ideas, setIdeas] = useState([]);

  const getAllIdea = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/idea");
      console.log(res.data);
      toast.success("Get all database");
      setIdeas(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const deleteIdea = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/admin/idea/${id}`);
      console.log(res.data);
      toast.success("Delete Idea successfully");
      getAllIdea();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllIdea();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h5>Manage Idea</h5>
          <NavLink to="/create-idea">
            <button className="btn btn-success m-2">New Idea</button>
          </NavLink>
          <div className="w-75">
            <table className="table">
              <thead>
                <th>Title</th>
                <th>Content</th>
                <th>Description</th>
                <th>Like</th>
                <th>Dislike</th>
                <th>Action</th>
              </thead>
              <tbody>
                {ideas?.map((item, index) => (
                  <tr key={index}>
                    <>
                      <td>{item.title}</td>
                      <td>{item.content}</td>
                      <td>{item.desc}</td>
                      <td>{item.desc}</td>
                      <td>{item.desc}</td>
                      <td>
                        <NavLink to={`/update-idea/${item._id}`}>
                        <button className="btn btn-primary">Edit</button>
                        </NavLink>
                        <button
                          className="btn btn-danger ml-2"
                          onClick={() => {
                            deleteIdea(item._id)
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageIdea;
