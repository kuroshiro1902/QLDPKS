import "./index.scss"
import { useNavigate } from "react-router-dom";
function Index() {
    const nav = useNavigate()
    const handleNavigate = ()=>{
        if(sessionStorage.getItem('account')) nav("/home")
        else nav("/login")
    }
    return ( <div className="entry">
        <button className=".form-group" onClick={handleNavigate}>Quản Lý Đặt Phòng Khách Sạn</button>
    </div>
     );
}

export default Index;