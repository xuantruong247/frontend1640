import React from "react";
import { NavLink } from "react-router-dom";

const QAMenu = () => {
  return (
    <>
      <div className="text-center">
        <div class="list-group">
          <h4>QA Panel</h4>

          <NavLink
            to="/manage-idea"
            className="list-group-item list-group-item-action"
          >
            Idea
          </NavLink>
          <NavLink
            to="/manage-sub"
            className="list-group-item list-group-item-action"
          >
            Submission
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default QAMenu;
