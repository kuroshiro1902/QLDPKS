import { useContext } from "react";
import { GlobalData } from "../GlobalContext";
import ProductCart from "../ProductCart"
import "./index.scss"
function Room() {
    const {rooms,setRooms} = useContext(GlobalData)
    return ( 
        <div>
            <div className="roombtns">
                <button className="submit">Đặt phòng</button>
                <button className="cancel">Hủy Phòng</button>
            </div>
            <div className="room">
                {rooms?.map(room => <ProductCart key={room.id} room={room} />)}
            </div> 
        </div>
    );
}

export default Room;