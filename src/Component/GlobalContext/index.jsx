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
    console.log("re-render")
    //Rooms
    const addRoom = (newRoom) => {
        fetch("http://localhost:9999/QLDPKS/room?method=add", {
            method: "POST",
            body: JSON.stringify(newRoom)
        })
            .then(res => res.json())
            .then(data => {
                setLoad(true)
                setChange(!change)
                setToast({ show: true, message: "Add room success!" })
            })
            .catch(err => { console.log(err) })
    }
    const bookRoom = (name, phone, id) => {
        console.log(name, phone, id);
        fetch(`http://localhost:9999/QLDPKS/booking?name=${name}&phone=${phone}&id=${id}`, { method: "POST" })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setLoad(true)
                setChange(!change)
                setToast({ show: true, message: "Booking success!" })
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
                setLoad(true)
                setChange(!change)
                setToast({ show: true, message: "Edit success!" })
            })
            .catch(err => { console.log(err) })
    }
    const checkOut = (roomid)=>{
        fetch(`http://localhost:9999/QLDPKS/booking?roomid=${roomid}`, { 
            method: "DELETE"
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            setLoad(true)
            setChange(!change)
            setToast({ show: true, message: "Checkout success!" })
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
                setLoad(true)
                setChange(!change)
                setToast({ show: true, message: "Add Service success!" })
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
            setLoad(true)
            setChange(!change)
            setToast({ show: true, message: "Edit success!" })
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
                <GlobalData.Provider value={{ rooms, services, revenues, addRoom, bookRoom, editRoom, addService, editService, checkOut }}>{children}</GlobalData.Provider>}
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