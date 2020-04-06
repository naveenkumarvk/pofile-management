import React, { Component } from "react";
import "../App.css";

const JobTable = ({ users, loadIntial }) => {
  return (
    <div style={{ position: "absolute", bottom: 0 }}>
      <table>
        <tr>
          <th>Name</th>
          <th>No of jobs</th>
        </tr>
        {users.map((data, i) => {
          return (
            <tr
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
