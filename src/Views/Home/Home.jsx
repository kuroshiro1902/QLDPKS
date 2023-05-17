import GlobalContext from "../../Component/GlobalContext";
import Management from "../../Component/Management";
function Home() {
    return ( 
    <>
    <div>
        <GlobalContext>
            <Management />
        </GlobalContext>
    </div>
    </>)
}

export default Home;