import React, { Component } from "react";
import "../App.css";

const JobTable = ({ users, loadIntial }) => {
  return (
    <div style={{ position: "absolute", bottom: '10%',left: '40%'  }}>
      <h4>Click on name select job person</h4>
      <table>
        <tr>
          <th >Name</th>
          <th >No of jobs</th>
        </tr>
        {users.map((data, i) => {
          return (
            <tr
              className="pointer"
              onClick={() => {
                loadIntial(data.id);
              }}
            >
              <td>{data.name}</td>
              <td>{data.noJobs}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default JobTable;
