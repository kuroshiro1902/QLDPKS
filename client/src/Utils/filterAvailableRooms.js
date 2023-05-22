export default function filterAvailableRooms(arr, isFree=undefined){
    console.log(isFree);
    isFree = Number(isFree)
    return (isFree!==-1) ? arr.filter(room=>{
        return Number(room.isFree) === isFree
    })
    : arr
}