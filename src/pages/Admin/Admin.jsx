import React from "react";
import { useState, useEffect, useRef } from "react";
import "../Admin/Admin.css";
import axios from "../../apiConfig";


const Admin = () => {
  const [data, setData] = useState([]);

  const fetchUser = async () => {
    const response = await axios.get("/users");
    setTimeout(() => {
      setData(response.data);
    }, 1000);
  };

  useEffect(() => {
    fetchUser();
  }, [data]);
  return (
    <div className="Admin page">
      <h1>Admin Control</h1>
      <div className="admin-util-container">
        <table>
          {data?.map((user, index) => {
            return (
              <tr key={index}>
                <td className={user.isVote ? "active" : null}>{user.name}</td>
                <td className={user.isVote ? "active" : null}>{user.email}</td>
                <td className={user.isVote ? "active" : null}>
                  {user.isVote ? "Voted" : "Not Voted"}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Admin;
