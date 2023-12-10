import React from "react";
import "../Buttons/Buttons.css";
const Buttons = ({handleSureClicked}) => {

  return (
    <div className="button-container">
      <button onClick={handleSureClicked}>I'm Sure</button>
      <button>Cancel</button>
    </div>
  );
};

export default Buttons;
