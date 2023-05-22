import { useState } from "react";
import "./index.scss"
import Booking from "./Booking";
import roomController from "./flags"
const roomType = {
  "Single": "Đơn",
  "Double": "Đôi"
}

function ProductCart({ room }) {
  const {id,name,type,price,isFree} = {...room}
  const controller = roomController[isFree]
  const [showInfo,setShowInfo] = useState(false)
  const [showBooking, setShowBooking] = useState(false)
  return (
      <div onClick={()=>{}} className="product-card" data-room-id={id} data-room-isfree={isFree}>
        <h3 className="product-name">{name}</h3>
        <p className="product-type">Loại: {roomType[type]}</p>
        <p className="product-price">$ {price}</p>
        <p className={`product-status ${controller.action}`}>{controller.state}</p>
        <button className={controller.classname} onClick={()=>setShowBooking(true)}>{controller.label}</button>
        {showBooking?<Booking room={room} action={controller.action} handleHide={()=>{setShowBooking(false)}} />:null}
      </div>
  );
}

export default ProductCart;