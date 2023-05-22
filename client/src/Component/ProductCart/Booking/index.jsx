import { useContext, useEffect, useRef, useState } from "react";
import { GlobalData } from "../../GlobalContext";
import s from "./index.module.scss"
import roomController from "../flags";
const roomType = {
    "Single": "Đơn",
    "Double": "Đôi"
  }
function Booking({ handleHide, room, action}) {
    const {id,name,type,price,isFree} = {...room}
    const controller = roomController[isFree]
    const customerName = useRef()
    const customerPhone = useRef()
    const [cusName, setCusName] = useState("")
    const [cusPhone, setCusPhone] = useState("")
    const {bookRoom,checkIn, checkOut, waitCheckOut, cancelCheckIn} = useContext(GlobalData)
    const handleBooking = ()=>{
        const custName= customerName.current.value.trim()
        const phone = customerPhone.current.value
        const digitsOnlyRegex = /^\d+$/;
        if(!custName|| !digitsOnlyRegex.test(phone)){alert("Invalid Information"); return}
        bookRoom(custName, phone, id)
        handleHide()
    }
    const handleCheckin = ()=>{
        const custName= customerName.current.value.trim()
        const phone = customerPhone.current.value
        const digitsOnlyRegex = /^\d+$/;
        if(!custName|| !digitsOnlyRegex.test(phone)){alert("Invalid Information"); return}
        checkIn({id, name: custName, phone: phone, room_id: room.id})
        handleHide()
    }
    const handleWaitCheckout = ()=>{
        waitCheckOut(id)
        handleHide()
    }
    const handleCheckout = ()=>{
        checkOut(room.id)
        handleHide()
    }
    const handleCancelCheckIn = ()=>{
        cancelCheckIn({id,name: cusName, phone: cusPhone,room_id: room.id})
        handleHide()
    }
    useEffect(()=>{
        fetch(`http://localhost:9999/QLDPKS/customer?roomid=${id}`)
        .then(response=>response.json())
        .then((data)=>{
            setCusName(data.name)
            setCusPhone(data.phone)
        })
        .catch((error)=>{
            setCusName("Can't find this Customer")
            setCusPhone("Can't find this Customer")
        })
    },[])
    console.log(action);
    return (
        <div className="overlay">
            <div className="dialog">
                <h2 style={{marginBottom: "8px"}}>{controller.label}</h2>
                <h3 className="product-name">{name}</h3>
                <p className="product-type">Loại: {roomType[type]}</p>
                <p className="product-price">$ {price}</p>
                <p className={`product-status ${controller.action}`}>{controller.state}</p>
                {action==='booking'&&
                    <>
                    <div className={s.customerInfo} style={{display: "flex", flexDirection:"column"}}>
                        <span>Tên khách hàng</span>
                        <input ref={customerName} placeholder="Tên khách hàng"/>
                        <span>Số điện thoại</span>
                        <input ref={customerPhone} placeholder="Số điện thoại" />
                    </div>
                    <button className="submit" onClick={handleBooking}>Đặt phòng</button>
                    </>
                    
                } 
                {action==='checkin' && 
                    <>
                    <div style={{marginTop: "8px"}}>Tên khách hàng: </div>
                        <input ref={customerName} style={{padding: "4px", width: "90%"}} placeholder="Tên khách hàng" value={cusName} onChange={(e)=>{setCusName(e.target.value)}}/>
                        <br/>
                    <div style={{marginTop: "8px"}}>Số điện thoại: </div>
                        <input ref={customerPhone}style={{padding: "4px", width: "90%"}}  placeholder="Số điện thoại" value={cusPhone}  onChange={(e)=>{setCusPhone(e.target.value)}}/>
                        <div style={{margin: "8px 0"}}/>
                    <button className="submit" onClick={handleCheckin}>Check in</button> 
                    <button className="delete" onClick={handleCancelCheckIn}>Hủy phòng</button>
                    </>
                }
                {action==='cancel' && 
                    <>
                    <div style={{display: "flex"}}>Tên khách hàng: <h3 style={{marginLeft: "4px"}} className="product-price"> {cusName}</h3> </div>
                    <div style={{display: "flex"}}>Số điện thoại: <h3 style={{marginLeft: "4px"}} className="product-price"> {cusPhone}</h3> </div>
                    <button className="delete" onClick={handleWaitCheckout}>Trả phòng</button> 
                    </>
                }
                {action==='checkout' && 
                    <>
                    <div style={{display: "flex"}}>Tên khách hàng: <h3 style={{marginLeft: "4px"}} className="product-price"> {cusName}</h3> </div>
                    <div style={{display: "flex"}}>Số điện thoại: <h3 style={{marginLeft: "4px"}} className="product-price"> {cusPhone}</h3> </div>
                    <button className="delete" onClick={handleCheckout}>Check out</button> 
                    </>
                }
                <button style={{marginLeft:"8px"}} className="cancel" onClick={handleHide}>Cancel</button>
            </div>
        </div>
    )
}

export default Booking;