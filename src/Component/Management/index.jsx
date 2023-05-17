import {useState, useContext, createContext } from "react";
import Main from "./Main";
import Navbar from "./Navbar";

import Room from "../Room";
export const ManagementContext = createContext()
import "./index.scss"
function Management() {

    const managers = [<Room/>]
    const [currentManager, setCurrentManager] = useState(1)
    return ( 
        <ManagementContext.Provider value={{currentManager,setCurrentManager}}>
            <div className="management">
                <Navbar />
                <Main element={managers[currentManager-1]}/>
            </div> 
        </ManagementContext.Provider>
    );
}

export default Management;