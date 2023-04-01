import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";

const AddSubQA = () => {
  const [auth] = useAuth();
  const checkAdmin = auth.users?.role?.name === "admin";
  const checkQa = auth.users?.role?.name === "QA";
  const checkUser = auth.users?.role?.name === "user";
  const [name, setName] = useState("");
  const [deadline_1, setDeadline_1] = useState("");
  const [deadline_2, setDeadline_2] = useState("");

  const navigate = useNavigate();

  const handleCreateSub = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/admin/submission", {
        name,
        deadline_1,
        deadline_2,
      });
      navigate("/submissionQA");
      console.log(res.data);
      toast.success("Create success");
    } catch (error) {
      console.log(error);
      toast.error("Create false");
    }
  };

  const checkRole = () => {
    if (checkAdmin) {
      return <a href="/submissionAdmin">Back to list</a>;
    }
    if (checkQa) {
      return <a href="/submissionQA">Back to list</a>;
    }
    if (checkUser) {
      return <a href="/submission">Back to list</a>;
    }
  };

  return (
    <div className="container">
      <h3>Add Submission</h3>
      <hr />
      <div className="w-1/3">
        <form
          className="bg-white rounded pt-6 pb-8 mb-4"
          onSubmit={handleCreateSub}
        >
          <div className="mb-4">
            <label className="block text-black text-base " for="name">
              Name
            </label>
            <input
              className=" border-2 rounded w-full text-black py-1 "
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label className="block text-black text-base mt-2" for="dealine_1">
              Deadline_1
            </label>
            <input
              className=" border-2 rounded w-full text-black py-1 "
              type="datetime-local"
              id="dealine_1"
              value={deadline_1}
              onChange={(e) => {
                setDeadline_1(e.target.value);
              }}
            />
            <label className="block text-black text-base mt-2" for="dealine_2">
              Deadline_2
            </label>
            <input
              className=" border-2 rounded w-full text-black py-1 "
              type="datetime-local"
              id="dealine_2"
              value={deadline_2}
              onChange={(e) => {
                setDeadline_2(e.target.value);
              }}
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
              type="submit"
            >
              Create
            </button>
            <br />
            <div>{checkRole()}</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubQA;
