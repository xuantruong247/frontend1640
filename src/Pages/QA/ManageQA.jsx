import React from "react";
import QAMenu from "../../components/QAComponents/QAMenu";

const ManageQA = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <QAMenu />
        </div>
        <div className="col-md-9"></div>
      </div>
    </div>
  );
};

export default ManageQA;
