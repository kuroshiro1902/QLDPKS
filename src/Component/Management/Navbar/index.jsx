import Controller from "../../Controller";
import "./index.scss"
function Navbar() {
    return ( <div className="navbar">
        <Controller index = {1}>Quản lý phòng</Controller>
        <Controller index = {2}>Quản lý dịch vụ</Controller>
        <Controller index = {3}>Thống kê và Báo cáo</Controller>
        <Controller index = {4}>Quản lý Tài khoản</Controller>
    </div> );
}

export default Navbar;