import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import FileSaver from "file-saver"
import { saveAs } from "file-saver";
const JSZip = require("jszip");

const SubmissionAdmin = () => {
  const [submission, setSubmission] = useState([]);
  const [dataZip, setDataZip] = useState([]);
  const XLSX=require('xlsx');

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
  const convertJsonToExcel=()=>{
    const worksheet=XLSX.utils.json_to_sheet(dataZip);
    const workBook=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook,worksheet,"idea")
    XLSX.write(workBook,{bookType:'xlsx',type:"buffer"})
    XLSX.write(workBook,{bookType:'xlsx',type:"binary"})
    XLSX.writeFile(workBook,"ideaData.xlsx")
  }

  const isDeadlineExpired = (deadline) => {
    return moment(deadline).isBefore(moment());
  };
  const getSubId = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/user/idea/${id}`);
      setDataZip(res.data);
      exportZip(dataZip);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  const exportZip = async () => {
    const arr = [
      "https://res.cloudinary.com/dgqj9ahle/image/upload/v1680606477/ehpbvyw4vrkd9pqvjgmc.jpg",
      "https://res.cloudinary.com/dgqj9ahle/image/upload/v1680288277/frrlfjmhcldkpnbwviul.png",
    ];
    const zip = new JSZip();
    try {
      const responses = await Promise.all(
        arr.map((url) =>
          axios.get(url, {
            responseType: "arraybuffer",
          })
        )
      );
      let i = 0;
      for (const response of responses) {
        const data = await response.data;
        const filename = arr[i].substring(arr[i].lastIndexOf("/") + 1);
        zip.file(filename, data);
        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, "images.zip");
        i++;
      }
      const content = await zip.generateAsync({ type: "blob" });
      console.log(content);
    } catch (error) {
      console.error("Failed to download files and create zip:", error);
    }
  };
  return (
    <div className="container mb-28 grid grid-cols-3 gap-4 row-span-2  mlg:grid-cols-2 mmd:grid-cols-1 mmd:max-w-md">
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
              <NavLink to={`/listIdea/${item._id}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">
                  View Ideas
                </button>
              </NavLink>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-2 "
                onClick={() => getSubId(item._id)}
              >
                Export ZIP
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-2"
                onClick={() => convertJsonToExcel(item._id)}
              >
                Export Excel
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubmissionAdmin;
