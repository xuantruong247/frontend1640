import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import IdeaPage from "../Pages/IdeaPage/IdeaPage";
import SubmissionPage from "../Pages/SubmissionPage/SubmissionUser";
import ContactPage from "../Pages/ContactPage/ContactPage";
import LoginPage from "./../Pages/LoginPage/LoginPage";
import AddIdea from "../Pages/IdeaPage/AddIdea";
import ListIdea from "../Pages/IdeaPage/ListIdea";
import SubmissionAdmin from "../Pages/SubmissionPage/Admin/SubmissionAdmin";
import SubmissionQA from "../Pages/SubmissionPage/QA/SubmissionQA";
import AddSubQA from "../Pages/SubmissionPage/QA/AddSubQA";
import { useAuth } from "../context/auth";
import HomePage from "../Pages/HomePage/HomePage";
import Per from "../components/Error/Per";
import ManageCategory from "../Pages/Admin/Category/ManageCategory";
import ManageAdmin from "../Pages/Admin/ManageAdmin";
import ManageQA from "../Pages/QA/ManageQA";
import ManageIdea from "../Pages/QA/ManageIdea";
import ManageSub from "../Pages/QA/ManageSub";
import CreateCategory from "../Pages/Admin/Category/CreateCategory";
import UpdateCategory from "../Pages/Admin/Category/UpdateCategory";
import ManageRole from "../Pages/Admin/Role/ManageRole";
import CreateRole from "../Pages/Admin/Role/CreateRole";
import UpdateRole from "../Pages/Admin/Role/UpdateRole";
import ManageUser from "../Pages/Admin/User/ManageUser";
import CreateUser from "../Pages/Admin/User/CreateUser";
import UpdateUser from "../Pages/Admin/User/UpdateUser";
import Dashboard from "../Pages/Dashboard/Dashboard";

const Routers = () => {
  const [auth] = useAuth();
  const check = !auth.users?.role.name;
  const checkAdmin = auth.users?.role?.name === "admin";
  const checkQa = auth.users?.role?.name === "QA";
  const checkUser = auth.users?.role?.name === "user";
  return (
    <Routes>
      {/* User */}
      <Route path="/" element={<Navigate to={"/home"} />} />
      <Route path="home" element={check ? <LoginPage /> : <HomePage />} />
      <Route path="idea" element={check ? <LoginPage /> : <IdeaPage />} />
      <Route
        path="submission"
        element={check ? <LoginPage /> : <SubmissionPage />}
      />
      <Route
        path="/listIdea/:id"
        element={check ? <LoginPage /> : <ListIdea />}
      />
      <Route path="contact" element={<ContactPage />} />
      <Route path="login" element={check ? <LoginPage /> : <HomePage />} />
      <Route
        path="addIdea/:id"
        element={checkUser || checkAdmin || checkQa ? <AddIdea /> : <Per />}
      />

      {/* QA */}
      <Route
        path="submissionQA"
        element={checkQa ? <SubmissionQA /> : <Per />}
      />
      <Route path="manageQA" element={<ManageQA />} />

      {/* Admin */}
      <Route
        path="submissionAdmin"
        element={checkAdmin ? <SubmissionAdmin /> : <Per />}
      />
      <Route
        path="addSubQA"
        element={checkAdmin || checkQa ? <AddSubQA /> : <Per />}
      />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="manage-user" element={<ManageUser />} />
      <Route path="create-user" element={<CreateUser />} />
      <Route path="update-user/:id" element={<UpdateUser />} />
      <Route path="manage-category" element={<ManageCategory />} />
      <Route path="create-category" element={<CreateCategory />} />
      <Route path="update-category/:id" element={<UpdateCategory />} />
      <Route path="manageAdmin" element={<ManageAdmin />} />
      <Route path="manage-idea" element={<ManageIdea />} />
      <Route path="manage-sub" element={<ManageSub />} />
      <Route path="manage-role" element={<ManageRole />} />
      <Route path="create-role" element={<CreateRole />} />
      <Route path="update-role/:id" element={<UpdateRole />} />
    </Routes>
  );
};

export default Routers;
