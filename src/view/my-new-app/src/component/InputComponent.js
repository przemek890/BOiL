import React from 'react';
import "./Input/style.css"
import Table1 from "./T/Table1";
import Table2 from "./T/Table2";
import "./GT.css"

const InputComponent = () => {
  return(
      <div style={{display: "flex"}} className="tables">
            <Table1></Table1>
            <Table2></Table2>
      </div>
  )
};

export default InputComponent;