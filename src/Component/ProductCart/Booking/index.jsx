import { useContext, useEffect, useRef, useState } from "react";
import { GlobalData } from "../../GlobalContext";
import s from "./index.module.scss"
function Booking({ handleHide, room, action}) {
    const customerName = useRef()
    const customerPhone = useRef()
    const [cusName, setCusName] = useState("")
    const [cusPhone, setCusPhone] = useState("")
    const isFree = room.isFree === 1 ? "Còn phòng" : "Khách hàng đã đặt phòng"
    const {bookRoom, checkOut} = useContext(GlobalData)
    const handleBooking = ()=>{
        const name = customerName.current.value.trim()
        const phone = customerPhone.current.value
        const id = room.id
        console.log(id);
        const digitsOnlyRegex = /^\d+$/;
        if(!name || !digitsOnlyRegex.test(phone)){alert("Invalid Information"); return}
        bookRoom(name, phone, id)
        handleHide()
    }
    const handleCheckout = ()=>{
        checkOut(room.id)
        handleHide()
    }
    useEffect(()=>{
        fetch(`http://localhost:9999/QLDPKS/customer?roomid=${room.id}`)
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
    return (
        <div className="overlay">
            <div className="dialog">
                <h2 style={{marginBottom: "8px"}}>{action==='checkin'?"Đặt phòng":"Trả phòng"}</h2>
                <h3 className="product-name">{room.name}</h3>
                <p className="product-type">Loại: {room.type}</p>
                <p className="product-price">$ {room.price}</p>
                <p className={`product-status ${room.isFree === 1 ? "isFree" : ""}`}>{isFree}</p>
                {action!=='checkin' && 
                    <>
                    <div style={{display: "flex"}}>Tên khách hàng: <h3 style={{marginLeft: "4px"}} className="product-price"> {cusName}</h3> </div>
                    <div style={{display: "flex"}}>Số điện thoại: <h3 style={{marginLeft: "4px"}} className="product-price"> {cusPhone}</h3> </div>
                    </>
                }
                {action==='checkin'?
                    <>
                    <div className={s.customerInfo} style={{display: "flex", flexDirection:"column"}}>
                        <span>Tên khách hàng</span>
                        <input ref={customerName} placeholder="Tên khách hàng"/>
                        <span>Số điện thoại</span>
                        <input ref={customerPhone} placeholder="Số điện thoại" />
                    </div>
                    <button className="submit" onClick={handleBooking}>Check in</button>
                    </>
                    :<button className="delete" onClick={handleCheckout}>Check out</button> 
                } 
                <button style={{marginLeft:"8px"}} className="cancel" onClick={handleHide}>Cancel</button>
            </div>
        </div>
    )
}

export default Booking;