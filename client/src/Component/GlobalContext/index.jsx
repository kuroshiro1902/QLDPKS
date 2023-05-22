import { createContext, useEffect, useState } from "react";
import Toast from "../Toast";
export const GlobalData = createContext()
function GlobalContext({ children }) {
    const [toast, setToast] = useState({ show: false, message: "" });
    const [load, setLoad] = useState(true)
    const [change, setChange] = useState(false)
    const [rooms, setRooms] = useState([])
    const [services, setServices] = useState([])
    const [revenues, setRevenues] = useState([])
    //
    function handleSuccess(message){
        setLoad(true)
        setChange(!change)
        setToast({ show: true, message: message})
    }
    console.log("re-render")
    //Rooms
    const addRoom = (newRoom) => {
        fetch("http://localhost:9999/QLDPKS/room?method=add", {
            method: "POST",
            body: JSON.stringify(newRoom)
        })
            .then(res => res.json())
            .then(data => {
                handleSuccess("Add room success!")
            })
            .catch(err => { console.log(err) })
    }
    const bookRoom = (name, phone, id) => {
        console.log(name, phone, id);
        fetch(`http://localhost:9999/QLDPKS/booking?name=${name}&phone=${phone}&id=${id}`)
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                handleSuccess("Booking Success!")
            })
            .catch(err => { console.log(err) })
    }
    const editRoom = (editRoomData) => {
        console.log(editRoomData);
        fetch(`http://localhost:9999/QLDPKS/room?method=edit`, { 
            method: "POST",
            body: JSON.stringify(editRoomData)
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                handleSuccess("Edit Room Success!")
            })
            .catch(err => { console.log(err) })
    }
    const deleteRoom = (room) => {
        fetch(`http://localhost:9999/QLDPKS/room?method=delete`, { 
            method: "POST",
            body: JSON.stringify(room)
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                handleSuccess("Delete Room Success!")
            })
            .catch(err => { console.log(err) })
    }
    //customer
    const checkOut = (roomid)=>{
        fetch(`http://localhost:9999/QLDPKS/booking?roomid=${roomid}`, { 
            method: "POST"
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            handleSuccess("Check out success!")
        })
        .catch(err => { console.log(err) })
    }
    const checkIn = (customer)=>{
        fetch(`http://localhost:9999/QLDPKS/check?action=checkin`, { 
            method: "POST",
            body: JSON.stringify(customer)
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            handleSuccess("Check in success!")
        })
        .catch(err => { console.log(err) })
    }
    const waitCheckOut = (roomid)=>{
        fetch(`http://localhost:9999/QLDPKS/check?action=checkout&roomid=${roomid}`, { 
            method: "POST"
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            handleSuccess("waiting for Checkout success!")
        })
        .catch(err => { console.log(err) })
    }
    const cancelCheckIn = (customer)=>{
        fetch(`http://localhost:9999/QLDPKS/check?action=cancel`, { 
            method: "POST",
            body: JSON.stringify(customer)
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            handleSuccess("Cancel checkin success!")
        })
        .catch(err => { console.log(err) })
    }
    //Services
    const addService = (service) => {
        fetch(`http://localhost:9999/QLDPKS/service?method=add`, { 
            method: "POST",
            body: JSON.stringify(service)
        })
        .then(res => res.json())
            .then(data => {
                handleSuccess("Add service success")
            })
            .catch(err => { console.log(err) })
    }
    const editService = (service)=>{
        fetch(`http://localhost:9999/QLDPKS/service?method=edit`, { 
            method: "POST",
            body: JSON.stringify(service)
        })
        .then(res => res.json())
        .then((data) => {
            handleSuccess("Edit service success")
        })
        .catch(err => { console.log(err) })
    }
    const deleteService = (service)=>{
        fetch(`http://localhost:9999/QLDPKS/service?method=delete`, { 
            method: "POST",
            body: JSON.stringify(service)
        })
        .then(res => res.json())
        .then((data) => {
            handleSuccess("Delete service success")
        })
        .catch(err => { console.log(err) })
    }
    //
    useEffect(() => {
        fetch("http://localhost:9999/QLDPKS/room")
            .then(res => res.json())
            .then(data => {
                setRooms(data)
                setLoad(false)
            })
        fetch("http://localhost:9999/QLDPKS/service")
            .then(res => res.json())
            .then(data => {
                setServices(data)
                setLoad(false)
            })
        fetch(`http://localhost:9999/QLDPKS/revenue`)
            .then(res => res.json())
            .then(data => {
                setRevenues(data)
                setLoad(false)
            })
    }, [change])
    return (
        <>
            {load ? <div>Loading...</div> :
                <GlobalData.Provider value={{ 
                    rooms, services, revenues, 
                    addRoom, bookRoom, editRoom, 
                    addService, deleteService ,
                    deleteRoom ,editService, 
                    checkOut, waitCheckOut, checkIn, cancelCheckIn }}
                >
                    {children}
                </GlobalData.Provider>}
            {toast.show && (
                <Toast
                    message={toast.message}
                    duration={3000}
                    onClose={()=>{setToast({ show: false, message: "" })}}
                />
            )}
        </>
    );
}

export default GlobalContext;