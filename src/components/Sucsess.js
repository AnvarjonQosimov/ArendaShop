import { BsSlash } from "react-icons/bs";
import { TbBackslash } from "react-icons/tb";
import "../styles/Success.css"

function Sucsess() {
  return (
    <div className="Success">
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
    </div>
  )
}

export default Sucsess
