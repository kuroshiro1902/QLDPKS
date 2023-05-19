import { useState } from "react";
import "./index.scss"
import Booking from "./Booking";
import Edit from "./Edit"
function ProductCart({ room }) {
  const isFree = room.isFree === 1 ? "Còn phòng" : "Hết phòng"
  const [showInfo,setShowInfo] = useState(false)
  const [showBooking, setShowBooking] = useState(false)
  const [showEdit,setShowEdit] = useState(false)
  return (
      <div onClick={()=>{setShowInfo(!showInfo)}} className="product-card" data-room-id={room.id} data-room-isfree={room.isFree}>
        <h3 className="product-name">{room.name}</h3>
        <p className="product-type">Loại: {room.type==='Single'? 'Đơn':'Đôi'}</p>
        <p className="product-price">$ {room.price}</p>
        <p className={`product-status ${room.isFree === 1 ? "isFree" : ""}`}>{isFree}</p>
        {room.isFree?
        <>
          <button className="submit" onClick={()=>setShowBooking(true)}>Đặt phòng</button>
          <button className="cancel" onClick={()=>setShowEdit(true)}>Chỉnh sửa</button>
          {showBooking?<Booking room={room} action={"checkin"} handleHide={()=>{setShowBooking(false)}} />:null}
          {showEdit? <Edit room={room} handleHide={()=>{setShowEdit(!showEdit)}} /> : null}
        </>
        :
        <>
          <button className="delete" onClick={()=>setShowBooking(true)}>Trả phòng</button>
          <button className="cancel" onClick={()=>setShowEdit(true)}>Chỉnh sửa</button>
          {showBooking? <Booking room={room} action={"checkout"} handleHide={()=>{setShowBooking(false)}} /> : null}
          {showEdit? <Edit room={room} handleHide={()=>{setShowEdit(!showEdit)}} /> : null}
        </>
        }
      </div>
  );
}

export default ProductCart;