import React, { useEffect, useRef, useState } from "react";
import axios from "../../apiConfig";
import "../Voting/Voting.css";
import foodTypes from "../../data";
import getUserData from "../../component/localStorage/localStorage.js";
const { isVote1 } = getUserData();
const Voting = ({ userId }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isVote, setIsVote] = useState(isVote1 === "true");
  const [votedIndex, setVotedIndex] = useState(null);
  const [confirmVote, setConfirmVote] = useState(false);
  const [changeVote, setChangeVote] = useState(false);
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
          console.log(allUsersVoteCount);
          
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllUserVotes();
  }, [userId]);

  useEffect(() => {
    if (isVote === "true") {
      setIsVote(true);
      setConfirmVote(false);
      setChangeVote(true);
    }
  }, [isVote]);

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

  const handleVote = async (index) => {
    if (isVote) return;

    const updatedVotes = { ...votes };

    if (selectedCard !== null && selectedCard !== index) {
      updatedVotes[foodTypes[selectedCard].name]--;
    }

    updatedVotes[foodTypes[index].name]++;

    setVotes(updatedVotes);
    setSelectedCard(index);
    setVotedIndex(index);
    setConfirmVote(true);
    setIsVote(true);
    setChangeVote(true);

    try {
      const response = await axios.put(`users/${userId}`, {
        isVote: true,
        votes: updatedVotes,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const confirmVoting = () => {
    if (votedIndex !== null) {
      const updatedVotes = { ...votes };

      if (selectedCard !== null) {
        updatedVotes[foodTypes[selectedCard].name]--;
      }

      updatedVotes[foodTypes[votedIndex].name]++;
      setVotes(updatedVotes);
      setIsVote(true);
      setConfirmVote(false);
      setChangeVote(true);
    }
  };

  const cancelVoting = () => {
    if (votedIndex !== null) {
      const updatedVotes = { ...votes };
      updatedVotes[foodTypes[votedIndex].name]--;
      setVotes(updatedVotes);
    }

    setConfirmVote(false);
    setVotedIndex(null);
    setSelectedCard(null);
    setIsVote(false);
    setChangeVote(false);
  };

  const changeVoting = (newVoteIndex) => {
    if (selectedCard !== null && newVoteIndex !== selectedCard) {
      const updatedVotes = { ...votes };

      updatedVotes[foodTypes[selectedCard].name]--;

      setVotes(updatedVotes);
      setIsVote(false);
      setChangeVote(false);
      setSelectedCard(newVoteIndex);
    }
  };
  localStorage.setItem("totalVoteCount", votes);
  return (
    <div className="Voting page">
      <h1>Voting Page</h1>
      <div className="cards-container">
        <ul>
          {foodTypes.map((foodType, index) => {
            return (
              <li key={index}>
                <div className="card-container">
                  <img src={foodType.img} alt={foodType.name} />
                  <h2>{foodType.name}</h2>
                  {!isVote && !confirmVote && (
                    <button onClick={() => handleVote(index)}>Vote</button>
                  )}
                  <h5>Votes: {votes[foodType.name]}</h5>
                  {confirmVote && votedIndex === index && (
                    <div className="btn-container">
                      <button onClick={confirmVoting}>I'm Sure</button>
                      <button onClick={cancelVoting}>Cancel</button>
                    </div>
                  )}
                  {changeVote && selectedCard !== index && (
                    <button onClick={() => changeVoting(index)}>
                      Change My Vote
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Voting;
