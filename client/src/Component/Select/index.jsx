import filterAvailableRooms from "../../Utils/filterAvailableRooms";
function Select({options=[],onChange}) {
    return ( 
        <select style={{cursor: "pointer", outline:"none"}} onChange={(e)=>{onChange(e.target.value)}}>
            {options.map((option,index)=>
                <option key={index} value={option.value}>{option.display}</option>    
            )}
        </select>
     );
}

export default Select;