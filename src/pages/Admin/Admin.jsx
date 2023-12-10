import React from "react";
import { useState, useEffect, useRef } from "react";
import "../Admin/Admin.css";
import axios from "../../apiConfig";
import VoteChart from "../../component/Chart/Chart";

const Admin = () => {
  const [data, setData] = useState([]);
  const [votes, setVotes] = useState({
    Hamburger: 0,
    Pizza: 0,
    Taco: 0,
    Steak: 0,
  });

  useEffect(() => {
    const fetchAllUserVotes = async () => {
      try {
        const response = await axios.get("/users");
        if (response.data) {
          const allUserVotes = response.data;
          const allUsersVoteCount = allUsersVoteArrayFunction(allUserVotes);
          setVotes(allUsersVoteCount);
  
          
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllUserVotes()
  }, []);
  const allUsersVoteArrayFunction = (allUserVotes) => {
    const allUsersVoteCount = {
      Hamburger: 0,
      Pizza: 0,
      Taco: 0,
      Steak: 0,
    };

    allUserVotes.forEach((user) => {
      const userVotes = user.votes;
      Object.keys(userVotes).forEach((foodType) => {
        allUsersVoteCount[foodType] += userVotes[foodType];
      });
    });

    return allUsersVoteCount;
  };


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
              <tbody key={index}>
              <tr >
                <td className={user.isVote ? "active" : null}>{user.name}</td>
                <td className={user.isVote ? "active" : null}>{user.email}</td>
                <td className={user.isVote ? "active" : null}>
                  {user.isVote ? "Voted" : "Not Voted"}
                </td>
              </tr>
              </tbody>
            );
          })}
        </table>
       
      </div>
     <div className="canvas-container">
     <VoteChart votes={votes}/>
     </div>
    </div>
  );
};

export default Admin;
