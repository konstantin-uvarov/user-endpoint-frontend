import React from "react";

const ColumnsLayout = ({ children, form }) => {
  return (
    <div className="layout">
      <div className="left-pane">{children}</div>
      <div className="right-pane">{form}</div>
    </div>
  );
};

export default ColumnsLayout;
