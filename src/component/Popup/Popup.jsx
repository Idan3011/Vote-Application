import '../Popup/Popup.css'
import { useRef } from 'react';


const Popup = ({}) => {
  const myRef = useRef();
  const handleClick = () => {
    myRef.current.className = "none";
    
    
  };
  return <div className="popup" ref={myRef}>
  <h4>Invalid Email or Password. </h4>
  <h5>Please try again</h5>
  <button onClick={handleClick}>CONFRIM</button>
</div>
};

export default Popup;
