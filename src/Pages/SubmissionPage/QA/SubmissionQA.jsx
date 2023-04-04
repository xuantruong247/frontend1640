import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const SubmissionQA = () => {
  const [submission, setSubmission] = useState([]);

  const getAllSub = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/submission");
      setSubmission(res.data);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSub();
  }, []);

  const isDeadlineExpired = (deadline) => {
    return moment(deadline).isBefore(moment());
  };

  return (
    <div className="container mb-28 grid grid-cols-3 gap-4 row-span-2  mlg:grid-cols-2 mmd:grid-cols-1 mmd:max-w-md">
      <div className="flex justify-end row-start-1 col-span-3"></div>
      {submission?.map((item, index) => (
        <div
          key={index}
          style={{
            color: moment(item.deadline_2).isBefore(moment()) ? "red" : "black",
          }}
          className="max-w-sm rounded overflow-hidden shadow-lg mb-[30px] m-auto"
        >
          <div className="px-6 py-4 text-center">
            <img
              className="w-full"
              src="https://cms.greenwich.edu.vn/pluginfile.php/1/theme_adaptable/frontpagerendererdefaultimage/1671766848/edu-survey-landing-image.jpg"
              alt="logoSub"
            />
            <div className="font-bold text-xl mb-2">Name: {item.name}</div>
            <p
              className={
                isDeadlineExpired(item.deadline_1)
                  ? "text-red-500 d-flex font-normal"
                  : "text-black d-flex font-normal"
              }
            >
              Deadline:{" "}
              {moment(item.deadline_1).format("DD - MM - YYYY h:mm a")}
            </p>
            <p
              className={
                isDeadlineExpired(item.deadline_2)
                  ? "text-red-500 d-flex font-normal"
                  : "text-black d-flex font-normal"
              }
            >
              Deadline:{" "}
              {moment(item.deadline_2).format("DD - MM - YYYY h:mm a")}
            </p>

            <div className="flex justify-center">
              <NavLink to={`/listidea/${item._id}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">
                  View Ideas
                </button>
              </NavLink>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-2 ">
                Export ZIP
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-2">
                Export Excel
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubmissionQA;
