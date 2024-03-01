import React from 'react';
import './Input/style.css'
// import * as ISC from "./Input/script"

function ExportOptions({ id }) {
  return (
    <div className="export__file">
      <label htmlFor={`export-file${id}`} className="export__file-btn" title="Export File"></label>
      <input type="checkbox" id={`export-file${id}`} />
      <div className="export__file-options">
        <label>Export As &nbsp; &#10140;</label>
        <label htmlFor={`export-file${id}`} id={`toPDF${id}`}>PDF <img src="./Input/images/pdf.png" alt="" /></label>
        <label htmlFor={`export-file${id}`} id={`toJSON${id}`}>JSON <img src="./Input/images/json.png" alt="" /></label>
        <label htmlFor={`export-file${id}`} id={`toCSV${id}`}>CSV <img src="./Input/images/csv.png" alt="" /></label>
        <label htmlFor={`export-file${id}`} id={`toEXCEL${id}`}>EXCEL <img src="./Input/images/excel.png" alt="" /></label>
      </div>
    </div>
  );
}

function TableHeader({ title, id }) {
  return (
    <section className="table__header">
      <h1>{title}</h1>
      <div className="input-group">
        <input type="search" placeholder="Search Data..." />
        <img src="./Input/images/search.png" alt="" />
      </div>
      <ExportOptions id={id} />
    </section>
  );
}

function TableRow({ data }) {
  return (
    <tr>
      {data.map((cell, index) => <td key={index}>{cell}</td>)}
    </tr>
  );
}

function TableBody({ rows }) {
  return (
    <section className="table__body">
      <table>
        <thead>
          <tr>
            <th> Id <span className="icon-arrow">&UpArrow;</span></th>
            <th> Czynność <span className="icon-arrow">&UpArrow;</span></th>
            <th> Czynność bezpośrednio poprzedzająca <span className="icon-arrow">&UpArrow;</span></th>
            <th> Czas trwania <span className="icon-arrow">&UpArrow;</span></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((rowData, index) => <TableRow key={index} data={rowData} />)}
        </tbody>
      </table>
    </section>
  );
}

function MainTable({ title, id, rows }) {
  return (
    <main className="table" id={id}>
      <TableHeader title={title} id={id} />
      <TableBody rows={rows} />
    </main>
  );
}

const InputComponent = () => {
  const leftTableData = [
    ['1', 'A', '-', '5'],
    ['2', 'B', '-', '7'],
    ['3', 'C', 'A', '6'],
    ['4', 'D', 'A', '8'],
    ['5', 'E', 'B', '3'],
    ['6', 'F', 'C', '4'],
    ['7', 'G', 'C', '2'],
    ['8', 'H', 'E D F', '5'],
    ['9', 'No data', 'No data', 'No data'],
    ['10', 'No data', 'No data', 'No data']
  ];

  const rightTableData = [
    ['1', 'A', '1', '2'],
    ['2', 'B', '1', '3'],
    ['3', 'C', '2', '4'],
    ['4', 'D', '2', '5'],
    ['5', 'E', '3', '5'],
    ['6', 'F', '4', '5'],
    ['7', 'G', '4', '6'],
    ['8', 'H', '5', '6'],
    ['9', 'No data', 'No data', 'No data'],
    ['10', 'No data', 'No data', 'No data']
  ];

  return (
    <div>
      <MainTable title="Czynność poprzedzająca" id="customers_table" rows={leftTableData} />
      <MainTable title="Numeracja zdarzeń" id="right_table" rows={rightTableData} />
    </div>
  );
};

export default InputComponent;