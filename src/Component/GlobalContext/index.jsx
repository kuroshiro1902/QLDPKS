import { createContext, useEffect, useState } from "react";
export const GlobalData = createContext()
function GlobalContext({children}) {
    const [rooms, setRooms] = useState([])
    console.log(rooms)

    useEffect(()=>{
        fetch("http://localhost:9999/QLDPKS/room")
        .then(res=>res.json())
        .then(data=>{
            setRooms(data)
        })
    },[])
    return ( <GlobalData.Provider value={{rooms,setRooms}}>{children}</GlobalData.Provider> );
}

export default GlobalContext;