import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineComment,
} from "react-icons/ai";
import { GrView } from "react-icons/gr";

const DetailIdea = () => {
  const [ideaOne, setIdeaOne] = useState([]);
  const { id } = useParams();

  const getFindOne = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/admin/idea/${id}`);
      setIdeaOne(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getFindOne();
  }, []);

  return (
    <div className="container">
      <div>
        <h1>Detail Idea</h1>
        <a href="/idea">Back to list Idea</a>
        <hr />
      </div>
      <div className="row my-20">
        <div className="col-md-5">
          <img src={ideaOne?.image?.url} alt="" />
        </div>
        <div className="col-md-7">
          <div
            className="d-flex flex-column justify-between"
            style={{ border: "1px solid red" }}
          >
            <div style={{ border: "1px solid blue" }}>
              <p>Title: {ideaOne.title}</p>
              <p>Category {ideaOne.category?.name}</p>
              <p>Content: {ideaOne.content}</p>
              <p>Submission {ideaOne.submission?.name}</p>
            </div>
            <div className="row">
              <div className="col-md-3">
                <span className="d-flex">
                  <GrView className="mt-1 mx-1" /> View
                </span>
              </div>

              <div className="col-md-9">
                <div className="bg-gray-500 w-32 d-flex justify-between rounded ">
                  <button className="btn btn-secondary d-flex">
                    <AiOutlineLike className="text-xl " />
                    Like
                  </button>
                  <span className="text-white text-xl">|</span>
                  <button className="btn btn-secondary d-flex">
                    <AiOutlineDislike className="text-xl " />
                    Dislike
                  </button>
                  <a
                    href="#cmt"
                    className="d-flex text-decoration-none text-black items-center"
                  >
                    <AiOutlineComment className="text-2xl" />
                    Comment
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="cmt" className="mx-2 pt-10">
          <label className="block text-black text-base mt-2" htmlFor="content">
            Your Comment
          </label>
          <input
            type="Text"
            placeholder="Enter Your Comment"
            style={{
              border: "none",
              borderBottom: "1px solid black",
              outline: "none",
              backgroundColor: "transparent",
              width: "89%",
            }}
          />
          <button className="btn btn-success mb-2 ml-2">Sent Comment</button>
        </div>
        <div>
            show người comment
        </div>
      </div>
    </div>
  );
};

export default DetailIdea;
