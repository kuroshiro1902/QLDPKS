import { useContext } from "react";
import "./index.scss"
import { ManagementContext } from "../Management";
function Controller({children, index}) {
    const {currentManager,setCurrentManager} = useContext(ManagementContext)
    return ( 
    <button 
        className={`controller ${currentManager === index? "selected":""}`}
        onClick={()=>{setCurrentManager(index)}}
    >
        {children}
    </button> );
}

export default Controller;