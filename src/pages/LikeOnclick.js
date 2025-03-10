import Googleimg from "../images/googleimg.jpg"
import "../styles/LikeOnclick.css"
import { TbXboxXFilled } from "react-icons/tb";


function LikeOnclick() {
  return (
    <div className='LikeOnclick'>
        <i><TbXboxXFilled /></i> 
        <img src={Googleimg} alt="" />
    </div>
  )
}

export default LikeOnclick
