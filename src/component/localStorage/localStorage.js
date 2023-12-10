
const getUserData = () => {
  return {
    id: localStorage.getItem("id"),
    user: localStorage.getItem("user"),
    isAdmin: localStorage.getItem("isadmin"),
    isVote: localStorage.getItem("isVote"),
    votes: localStorage.getItem("votes"),
  };
};

export default getUserData
