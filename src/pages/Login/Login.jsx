import { useEffect, useState } from "react";
import "../Login/Login.css";
import axios from "../../apiConfig";
import Spinner from "../../component/Spinner/Spinner";
import Popup from "../../component/Popup/Popup";
import { useNavigate } from "react-router-dom";
const Login = ({ handleLogin }) => {
  const [data, setData] = useState();
  const [inputVal, setInputVal] = useState({ email: "", password: "" });
  const [userValidation, setUserValidation] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const userInput = e.target.value;

    setInputVal({ ...inputVal, [e.target.name]: userInput });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      data.map((user) => {
        if (
          user.email === inputVal.email &&
          user.password === inputVal.password
        ) {
          setUserValidation(true);
          localStorage.setItem("id", user.id);
          localStorage.setItem("user", user.name);
          localStorage.setItem("isadmin", user.isAdmin);
          localStorage.setItem("isVote", user.isVote);
          localStorage.setItem("votes", user.votes);
          handleLogin(user.id);

          setTimeout(() => {
            navigate("/pages/Voting/Voting");
          }, 3000);
        }
        setButtonClicked(true);

        return;
      });
    }, 1000);
  };

  const fetchUser = async () => {
    const response = await axios.get("/users");

    setTimeout(() => {
      setData(response.data);
    }, 2000);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="login page">
      <div className="form-container">
        {data ? (
          <form onSubmit={handleSubmit}>
            <img src="/pics/foodieawards.png" alt="login-logo" />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={handleChange} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={handleChange} />
            <input type="submit" value="LOGIN" />
          </form>
        ) : (
          <Spinner />
        )}
      </div>
      {userValidation ? <Spinner /> : null}
      {!userValidation && buttonClicked ? <Popup /> : null}
    </div>
  );
};

export default Login;
