import { useContext, useState, useEffect } from "react";
import { GlobalData } from "../GlobalContext";
import ProductCart from "../ProductCart"
import AddRoom from "./AddRoom";
import "./index.scss"
import SearchInput from "../SearchInput";
import Select from "../Select";
import search from "../../Utils/search";
import filterAvailableRooms from "../../Utils/filterAvailableRooms";
function Room() {
    const globalRooms = useContext(GlobalData).rooms
    const [rooms, setRooms] = useState(globalRooms)
    const [displayAddRoom, setDisplayAddroom] = useState(false)
    const [searchKeyWords,setSearchKeyWords] = useState("")
    const [filter, setFilter] = useState(-1)
    useEffect(() => {
        setRooms(globalRooms);
        console.log("effect");
    }, [globalRooms]);
    useEffect(() => {
        setRooms(filterAvailableRooms(search(globalRooms, searchKeyWords),filter))
        console.log("change")
    },[searchKeyWords,filter])
    return ( 
        <div>
            <div className="roombtns">
                <SearchInput onChange={setSearchKeyWords} title={"Phòng đơn: single\nPhòng đôi: double"}/>
                <Select onChange={setFilter} options={[{value:-1,display:"--Tình trạng--"},{value:1,display:"Phòng còn trống"},{value:0,display:"Phòng đã đặt"},{value:11, display: "Đợi checkin"},{value:10, display: "Đợi checkout"}]} />
                <button className="cancel" >Sửa phòng</button>
                <button className="submit" onClick={()=>setDisplayAddroom(!displayAddRoom)}>Thêm phòng</button>
            </div>
            <div className="room">
                {rooms.length>0?rooms.map(room => <ProductCart key={room.id} room={room} />):<div>Không có phòng.</div>}
            </div> 
            {displayAddRoom? <AddRoom hideAddRoom={()=>{setDisplayAddroom(false)}}/>:null}
        </div>
    );
}

export default Room;