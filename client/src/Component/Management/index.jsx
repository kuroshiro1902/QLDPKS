import {useState, useContext, createContext, memo } from "react";
import Main from "./Main";
import Navbar from "./Navbar";

import Room from "../Room";
import Service from "../Service";
import Analyst from "../Analyst";
export const ManagementContext = createContext()
import "./index.scss"
import Account from "../../Account";
function Management() {
    const managers = [<Room/>,<Service />,<Analyst />, <Account />]
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

export default memo(Management);