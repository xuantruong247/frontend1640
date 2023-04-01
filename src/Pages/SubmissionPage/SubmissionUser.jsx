import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const SubmissionPage = () => {
  const [submission, setSubmission] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/submission")
      .then((res) => {
        // console.log(res);
        setSubmission(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mb-28 grid grid-cols-3 gap-4  mlg:grid-cols-2 mmd:grid-cols-1 mmd:max-w-md">
      {submission?.map((item, index) => (
        <div
          key={index}
          className="max-w-sm rounded overflow-hidden shadow-lg mb-[30px] m-auto"
        >
          <div className="px-6 py-4 text-center  ">
            <img
              className="w-full"
              src="https://cms.greenwich.edu.vn/pluginfile.php/1/theme_adaptable/frontpagerendererdefaultimage/1671766848/edu-survey-landing-image.jpg"
              alt="logoSub"
            />
            <div className="font-bold text-xl mb-2">Name: {item.name}</div>
            <p className="text-red-600 font-medium text-lg text-left">
              Deadline_1:
              <span className="text-gray-700 font-normal text-base pl-2">
                {moment(item.deadline_1).format("DD - MM - YYYY h:mm a")}
              </span>
            </p>
            <p className="text-red-600 font-medium text-lg text-left  ">
              Deadline_2:
              <span className="text-gray-700 font-normal text-base pl-2">
                {moment(item.deadline_2).format("DD - MM - YYYY h:mm a")}
              </span>
            </p>

            <NavLink to={`/listIdea/${item._id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-full rounded-full mt-2">
                View Ideas
              </button>
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubmissionPage;
