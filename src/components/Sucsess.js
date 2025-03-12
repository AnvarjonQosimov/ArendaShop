import { BsSlash } from "react-icons/bs";
import { TbBackslash } from "react-icons/tb";
import "../styles/Success.css"
import { useState } from "react";

function Sucsess() {
  const[exit, setExit] = useState(false)

  const exitX = () => {
    setExit(true)
  }

  return (
    <div className="Success">
      {exit ? (<div></div>) : (<div className="success">
      <div className="x-icon">
        <p onClick={exitX}>x</p>
      </div>
      <div className="success-icon">
        <div className="icons-success">
        <i><TbBackslash /></i>
        <i><BsSlash /></i>
        </div>
      </div>

      <div className="success-line"></div>

      <div className="success-text">
        <p>Success</p>
      </div>
      </div>)}
    </div>
  )
}

export default Sucsess