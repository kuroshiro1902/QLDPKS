import GlobalContext from "../../Component/GlobalContext";
import Management from "../../Component/Management";
import UserInformation from "../../Component/UserInformation";
function Home() {
    return ( 
    <>
    <UserInformation />
    <div>
        <GlobalContext>
            <Management />
        </GlobalContext>
    </div>
    </>)
}

export default Home;