import React, { useEffect } from "react";
import { useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import { motion } from "framer-motion";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "../../App.css";

function IdeaPage() {
  const [idea, setIdea] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [activeBtn, setActiveBtn] = useState("none");
  const [categories, setCategories] = useState([]);

  const getAllidea = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/idea");
      console.log(res);
      toast.success("ok");
      setIdea(res.data);
    } catch (error) {
      console.log(error);
      toast.error("err");
    }
  };
  const handleLikeClick = () => {
    if (activeBtn === "none") {
      setLikeCount(likeCount + 1);
      setActiveBtn("like");
      return;
    }

    if (activeBtn === "like") {
      setLikeCount(likeCount - 1);
      setActiveBtn("none");
      return;
    }

    if (activeBtn === "dislike") {
      setLikeCount(likeCount + 1);
      setDislikeCount(dislikeCount - 1);
      setActiveBtn("like");
    }
  };
  const handleDisikeClick = () => {
    if (activeBtn === "none") {
      setDislikeCount(dislikeCount + 1);
      setActiveBtn("dislike");
      return;
    }

    if (activeBtn === "dislike") {
      setDislikeCount(dislikeCount - 1);
      setActiveBtn("none");
      return;
    }

    if (activeBtn === "like") {
      setDislikeCount(dislikeCount + 1);
      setLikeCount(likeCount - 1);
      setActiveBtn("dislike");
    }
  };

  const getAllCategory = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/category");
      setCategories(res.data);
      console.log(res.data);
      toast.success("okla");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllidea();
    getAllCategory();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const style = { color: "2F58CD", fontSize: "14px" };
  return (
    <div className="xl:container mx-auto grid grid-cols-12 my-[20px]">
      <div className="col-span-12 md:col-span-9">
        {idea?.map((item, index) => (
          <div
            key={index}
            className="relative w-full h-[140px] md:rounded-xl border-solid border-[1px] px-[8px] py-[8px] my-[20px]"
          >
            {categories?.map((item, index) => (
              <div
                key={index}
                className="absolute right-[20px] top-[-14px] font-bold text-lg bg-white leading-[16px] px-[6px] py-[4px] rounded-lg border-solid border"
              >
                {item.name}
              </div>
            ))}
            <div key={index} className="grid grid-cols-12 grid-row-2 h-full">
              <button className="col-span-2 m-auto row-end-2 lg:col-span-1">
                <motion.img
                  className="w-[60px] h-[60px] items-center h-25"
                  src={item?.image.url}
                  alt="user"
                />
              </button>
              <button
                className="col-span-10 lg:col-span-8 row-start-1 row-end-3"
                onClick={() => setShowModal(true)}
              >
                <p className="truncate text-[20px] font-bold my-0">
                  {item.title}
                </p>
                <p className="truncate my-[16px] row-end-2">{item.desc}</p>
              </button>
              {showModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-6xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            {item.title}
                          </h3>
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                          <p className="my-4 text-slate-500 text-lg leading-relaxed">
                            I always felt like I could do anything. That’s the
                            main thing people are controlled by! Thoughts- their
                            perception of themselves! They're slowed down by
                            their perception of themselves. If you're taught you
                            can’t do anything, you won’t do anything. I was
                            taught I could do everything.
                          </p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"></div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
              <div className="col-span-12 flex items-center justify-around lg:col-span-3">
                <button
                  className={`btn ${activeBtn === "like" ? "like-active" : ""}`}
                  onClick={handleLikeClick}
                >
                  <span className="material-symbols-rounded LikeButton ">
                    <AiFillLike />
                  </span>
                  Like {likeCount}
                </button>

                <button
                  className={`btn ${
                    activeBtn === "dislike" ? "dislike-active" : ""
                  }`}
                  onClick={handleDisikeClick}
                >
                  <span className="material-symbols-rounded">
                    <AiFillDislike />
                  </span>
                  Dislike {dislikeCount}
                </button>
                {/* <LikeButton id = "Like_button" className="LikeButton">
                </LikeButton>
                <DisLikeButton id = "Dislike_button" className="DislikeButton">
                </DisLikeButton> */}
                <button>
                  <FaCommentDots style={{ fontSize: "20px" }} />
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="col-span-7 flex justify-center">
          <Pagination />
        </div>
      </div>
    </div>
  );
}
export default IdeaPage;
