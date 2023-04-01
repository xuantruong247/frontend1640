import React, { useEffect } from "react";
import { useState } from "react";
import logoUser from "../../asset/img/logo-User.png";
import Pagination from "../../components/Pagination/Pagination";
import { motion } from "framer-motion";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaCommentDots, FaCircle } from "react-icons/fa";
import Modal from "../../components/Modal/Modal.jsx";
import axios from "axios";
import { toast } from "react-toastify";
function IdeaPage() {
  const [idea, setIdea] = useState([]);

  const getAllidea = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/idea");
      console.log(res);
      toast.success("ok");
    } catch (error) {
      console.log(error);
      toast.error("err");
    }
  };

  useEffect(() => {
    getAllidea();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const style = { color: "2F58CD", fontSize: "14px" };
  return (
    <div className="xl:container mx-auto grid grid-cols-12 my-[20px]">
      <div className="col-span-3 mmd:hidden mx-[10px]">
        <p className="font-bold text-xl mx-[10px] my-[8px]">Category</p>
        <div className="flex font-bold text-base items-center my-[8px]">
          <p className="ml-[16px] mr-[10px] my-0">
            <FaCircle style={style} />
          </p>
          <p className="my-0">GENERAL</p>
        </div>
      </div>
      <div className="col-span-12 md:col-span-9">
        <div className="relative w-full h-[140px] md:rounded-xl border-solid border-[1px] px-[8px] py-[8px] my-[20px]">
          <div className="absolute right-[20px] top-[-14px] font-bold text-lg bg-white leading-[16px] px-[6px] py-[4px] rounded-lg border-solid border">
            Category
          </div>
          <div className="grid grid-cols-12 grid-row-2 h-full">
            <button className="col-span-2 m-auto row-end-2 lg:col-span-1">
              <motion.img
                className="w-[60px] h-[60px] items-center"
                src={logoUser}
                alt="user"
              />
            </button>
            <button
              className="col-span-10 lg:col-span-8 row-start-1 row-end-3"
              onClick={() => setShowModal(true)}
            >
              <p className="truncate text-[20px] font-bold my-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="truncate my-[16px] row-end-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </button>
            {showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-6xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">Modal Title</h3>
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
                          perception of themselves! They're slowed down by their
                          perception of themselves. If you're taught you can’t
                          do anything, you won’t do anything. I was taught I
                          could do everything.
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
              <button>
                <AiFillLike style={{ fontSize: "20px" }} />
              </button>
              <button>
                <AiFillDislike style={{ fontSize: "20px" }} />
              </button>
              <button>
                <FaCommentDots style={{ fontSize: "20px" }} />
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-7 flex justify-center">
          <Pagination />
        </div>
      </div>
    </div>
  );
}
export default IdeaPage;
