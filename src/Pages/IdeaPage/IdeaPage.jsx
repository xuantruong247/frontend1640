import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const IdeaPage = () => {
  const [ideaMap, setIdeaMap] = useState([]);
  const [likeCount,setLikeCount] = useState('')

  const token = JSON.parse(localStorage.getItem("auth")).accessToken;

  const getAllIdeas = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/idea");
      setIdeaMap(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const increaseViewCount = async (id) => {
    try {
      const res = await axios({
        method: "get",
        url: `http://localhost:8080/auth/views/${id}`,
        headers: {
          "x-access-token": `${token}`,
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Something error at view");
    }
  };

  const increaseLike = async (id) => {
    try {
      const res = await axios({
        method: "post",
        url: `http://localhost:8080/auth/like/${id}`,
        headers: {
          "x-access-token": `${token}`,
        },
      });
      getAllIdeas()
    } catch (error) {
      console.log(error);
      toast.error("Somethign went error at like and dislike ");
    }
  };

  const increaseDislike = async (id) => {
    try {
      const res = await axios({
        method: "post",
        url: `http://localhost:8080/auth/dislike/${id}`,
        headers: {
          "x-access-token": `${token}`,
        },
      });
      getAllIdeas()
    } catch (error) {
      console.log(error);
      toast.error("Something went err at disslike");
    }
  };

  useEffect(() => {
    getAllIdeas();

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
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.desc}</td>
              <td className="text-center">{item.category?.name}</td>
              <td className="text-center">{item.submission?.name}</td>
              <td className="text-center">
                <span>Số view: {item.views?.length || 0}</span>
                <span className="mx-2">Số Like{item.likes?.length || 0}</span>
                <span>Số Dislike {item.dislikes?.length || 0} </span>
              </td>
              <td className="text-center">
                <Link to={`/idea/${item._id}`}>
                  <button
                    className="btn btn-primary"
                    onClick={() => increaseViewCount(item._id)}
                  >
                    Detail Idea
                  </button>
                </Link>
                <button
                  className="mx-2 btn btn-success"
                  onClick={() => increaseLike(item._id)}
                >
                  Like
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    increaseDislike(item._id);
                  }}
                >
                  Dislike
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IdeaPage;
