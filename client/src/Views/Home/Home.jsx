import GlobalContext from "../../Component/GlobalContext";
import Management from "../../Component/Management";
import UserInformation from "../../Component/UserInformation";
function Home() {

    return ( 
    <>
    <h1>Quản lý đặt phòng khách sạn</h1>
    <UserInformation />
    <div style={{marginBottom: "8px"}}></div>
    <div>
        <GlobalContext>
            <Management />
        </GlobalContext>
    </div>
    </>)
}

export default Home;