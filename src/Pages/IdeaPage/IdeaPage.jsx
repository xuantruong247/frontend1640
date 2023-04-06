import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const IdeaPage = () => {
  const [ideaMap, setIdeaMap] = useState([]);

  const getALlIdea = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/idea");
      setIdeaMap(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getALlIdea();
  }, []);

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr className="text-center">
            <th>STT</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Submission</th>
            <th>View || Like || Dislike</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ideaMap?.map((item, index) => (
            <>
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.desc}</td>
                <td className="text-center">{item.category?.name}</td>
                <td className="text-center">{item.submission?.name}</td>
                <td className="text-center">
                  <span>Số View</span>
                  <span className="mx-2">Số Like</span>
                  <span>Số Dislike</span>
                </td>
                <td className="text-center">
                  <Link to={`/idea/${item._id}`}>
                    <button className="btn btn-primary">Detail Idea</button>
                  </Link>
                  <button className="mx-2 btn btn-success">Like</button>
                  <button className="btn btn-danger">Dislike</button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IdeaPage;
