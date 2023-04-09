import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillLike, AiFillDislike, AiOutlineComment } from "react-icons/ai";
import moment from "moment";
import { GrView } from "react-icons/gr";

const DetailIdea = () => {
  const [ideaOne, setIdeaOne] = useState([]);
  const { id } = useParams();
  const [likeColor, setLikeColor] = useState("silver");
  const [dislikeColor, setDislikeColor] = useState("silver");

  const handleLikeClick = () => {
    if (likeColor === "silver") {
      setLikeColor("black");
      setDislikeColor("silver");
    } else {
      setLikeColor("silver");
    }
  };

  const handleDislikeClick = () => {
    if (dislikeColor === "silver") {
      setDislikeColor("black");
      setLikeColor("silver");
    } else {
      setDislikeColor("silver");
    }
  };

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
      <div className="grid grid-cols-12">
        <div className="col-span-5 h-[400px]">
          <img src={ideaOne?.image?.url} alt="" />
        </div>
        <div className="col-span-7 h-[420px] relative">
          <div
            className="flex flex-col justify-between"
            // style={{ border: "1px solid red" }}
          >
            <div 
            // style={{ border: "1px solid blue" }}
            >
              <p>Title: {ideaOne.title}</p>
              <p>Category {ideaOne.category?.name}</p>
              <p>Content: {ideaOne.content}</p>
              <p>Submission {ideaOne.submission?.name}</p>
            </div>
            <div className="flex flex-row justify-between">
              <div className="absolute bottom-[-30px]">
                <span className="flex">
                  <GrView className="mt-1 mx-1" /> View
                </span>
              </div>

              <div className="absolute bottom-[-40px] right-0">
                <div className="bg-gray-500 d-flex justify-between rounded ">
                  <button
                    className="btn btn-secondary d-flex"
                    onClick={handleLikeClick}
                  >
                    <AiFillLike
                      className="text-xl"
                      style={{ color: likeColor }}
                    />
                    Like
                  </button>
                  <span className="text-white text-xl">|</span>
                  <button
                    className="btn btn-secondary d-flex"
                    onClick={handleDislikeClick}
                  >
                    <AiFillDislike
                      className="text-xl"
                      style={{ color: dislikeColor }}
                    />
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
        <div id="cmt" className="mx-2 pt-10 col-span-12">
          <hr />
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
        {ideaOne.comments &&
          ideaOne.comments.map((item, index) => (
            <>
              <p className="d-flex " style={{ width: "1000px" }}>
                ( {moment(item.created_at).format("DD - MM - YYYY h:mm a")} ) -{" "}
                <span className="ml-2">{item.content}</span>
              </p>
            </>
          ))}
      </div>
    </div>
  );
};

export default DetailIdea;
