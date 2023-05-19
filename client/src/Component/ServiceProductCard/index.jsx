import { useState } from "react";
import Edit from "./Edit";
import "./index.scss"
function ServiceProductCart({service}) {
    const [showEdit, setShowEdit] = useState(false)

    const isAvailable = service.isAvailable===1? "Khả dụng" : "Bảo trì"
    return ( 
        <div className="product-card">
            <h3 className="product-name">{service.name}</h3>
            <p className="product-price">$ {service.price}</p>
            <p className={`product-status ${service.isAvailable === 1 ? "isAvailable" : ""}`}>{isAvailable}</p>
            <button className="cancel" onClick={()=>setShowEdit(true)}>Sửa dịch vụ</button>
            {showEdit && <Edit service={service} handleHide={()=>setShowEdit(false)}/>}
        </div>
     );
}

export default ServiceProductCart;