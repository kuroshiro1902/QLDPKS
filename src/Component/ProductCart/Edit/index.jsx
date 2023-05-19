import { GlobalData } from "../../GlobalContext";
import { useState, useContext } from "react";
function Edit({handleHide,room}) {
    const [name, setName] = useState(room.name)
    const [type, setType] = useState(room.type)
    const [price, setPrice] = useState(room.price)
    const {editRoom} = useContext(GlobalData)
    const handleEditRoom = ()=>{
        if(!name || isNaN(Number(price))){alert("Invalid Information"); return}
        const editRoomData = {
            id: room.id, 
            name: name.trim(), 
            type: type, 
            price: parseFloat(price),
            isFree: room.isFree
        }
        editRoom(editRoomData)
        handleHide()
    }
    return(
    <div className="overlay">
        <div className="dialog">

            <div style={{display: "flex"}}>
                Tên phòng: <input className="product-name" value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
            <div style={{display: "flex"}}>
                Loại: 
                <select className="product-type" onChange={(e) => setType(e.target.value)}>
                    {room.type==="Single"?
                    <>
                    <option value="Single">Đơn</option>
                    <option value="Double">Đôi</option>
                    </>
                    :<>
                    <option value="Single">Đôi</option>
                    <option value="Double">Đơn</option>
                    </>
                    }
                </select>
            </div>
            <div style={{display: "flex"}}>
                Giá: $<input className="product-price" value={price} onChange={(e)=>setPrice(e.target.value)} />
            </div>
            <button className="submit" onClick={handleEditRoom}>Done</button>
            <button className="cancel" onClick={handleHide}>Cancel</button>
        </div>
    </div>
    )
    ;
}

export default Edit;