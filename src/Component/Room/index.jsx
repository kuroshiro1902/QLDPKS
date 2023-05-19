import { useContext, useState } from "react";
import { GlobalData } from "../GlobalContext";
import ProductCart from "../ProductCart"
import AddRoom from "./AddRoom";
import "./index.scss"
function Room() {
    const {rooms} = useContext(GlobalData)
    const [displayAddRoom, setDisplayAddroom] = useState(false)
    return ( 
        <div>
            <div className="roombtns">
                <button className="addRoom submit" onClick={()=>setDisplayAddroom(!displayAddRoom)}>Thêm phòng</button>
            </div>
            <div className="room">
                {rooms?.map(room => <ProductCart key={room.id} room={room} />)}
            </div> 
            {displayAddRoom? <AddRoom hideAddRoom={()=>{setDisplayAddroom(false)}}/>:null}
        </div>
    );
}

export default Room;