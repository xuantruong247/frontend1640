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
import RegisterPage from "../Pages/Register/RegisterPage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Category from "../Pages/Category/Category";

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

      {/* Admin */}
      <Route
        path="submissionAdmin"
        element={checkAdmin ? <SubmissionAdmin /> : <Per />}
      />
      <Route
        path="addSubQA"
        element={checkAdmin || checkQa ? <AddSubQA /> : <Per />}
      />
      <Route path="register" element={<RegisterPage />} />
      <Route path="dashboard" element={checkAdmin ? <Dashboard /> : <Per />} />

      <Route path="category" element={checkAdmin ? <Category /> : <Per />} />
    </Routes>
  );
};

export default Routers;
