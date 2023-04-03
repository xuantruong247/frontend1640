import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../LoginPage/style.css";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const [updateRole, setUpdateRole] = useState("");
  const [role, setRole] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/role")
      .then((res) => {
        console.log(res.data);
        setRole(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`http://localhost:8080/admin/user/${id}`, {
        role: updateRole,
      });
      toast.success("Register Successfully");
      setUpdateRole(res.data);
      console.log(res.data);
      navigate("/manage-user");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://accommodationforstudents.com/cdn-cgi/image/f=auto,q=85,w=960/https://images.accommodationforstudents.com/website/university-guides/gb/university-of-greenwich/uni.jpg")',
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      <div className="man-den"></div>
      <div className="login-title">
        <div className="my-[20px] flex items-center justify-center">
          <div className="w-full  max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100">
            <h1 className="text-2xl font-bold text-center">Create User</h1>
            <form
              onSubmit={updateUser}
              novalidate=""
              action=""
              className="space-y-6 ng-untouched ng-pristine ng-valid"
            >
              <div className="space-y-1 text-sm">
                <select className="mt-3 w-full px-4 py-2 rounded-md border-gray-700 bg-white text-black">
                  <option defaultChecked>Choose Role</option>
                  {role?.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="block w-full p-3 font-medium text-center rounded-sm text-gray-900 bg-blue-500"
              >
                Create User
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
