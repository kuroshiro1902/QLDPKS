import { GlobalData } from "../../GlobalContext";
import { useState, useContext } from "react";
function Edit({handleHide,service}) {
    const [name, setName] = useState(service.name)
    const [price, setPrice] = useState(service.price)
    const [isAvailable, setIsAvailable] = useState(service.isAvailable)
    const {editService} = useContext(GlobalData)
    const handleEditService = ()=>{
        const serviceData = {id: service.id, name, price, isAvailable}
        if(!name || isNaN(Number(price))){alert("invalid input"); return}
        editService(serviceData)
        handleHide()
    }
    return <div className="overlay">
        <div className="dialog">
            <div style={{display: "flex"}}>
                Tên dịch vụ: <input className="product-name" value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
            <div style={{display: "flex"}}>
                Giá: $<input className="product-price" value={price} onChange={(e)=>setPrice(e.target.value)} />
            </div>
            <div style={{display: "flex"}}>
                Khả dụng: 
                <select className="product-type" onChange={(e) => setIsAvailable(e.target.value)}>
                    {service.isAvailable=="1"?
                    <>
                    <option value="1">Khả dụng</option>
                    <option value="0">Bảo trì</option>
                    </>
                    :<>
                    <option value="0">Bảo trì</option>
                    <option value="1">Khả dụng</option>
                    </>
                    }
                </select>
            </div>
            <button className="submit" onClick={handleEditService}>Submit</button>
            <button className="cancel" onClick={handleHide}>Cancel</button>
        </div>
    </div>
}

export default Edit;