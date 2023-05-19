import { useContext, useState } from "react";
import { GlobalData } from "../GlobalContext";
import ServiceProductCart from "../ServiceProductCard";
import AddService from "./AddService";
import "./index.scss"
function Service() {
    const [showAdd,setShowAdd] = useState(false)
    const {services} = useContext(GlobalData)
    return <div>
        <div className="servicebtns">
                <button className="addService submit" onClick={()=>setShowAdd(true)}>Thêm dịch vụ</button>
        </div>
        <div className="service">
            {services.map(service => <ServiceProductCart service={service} key={service.id} />)}
        </div>
        {showAdd && <AddService hideAddservice={()=>{setShowAdd(false)}} />}
    </div>
}

export default Service;