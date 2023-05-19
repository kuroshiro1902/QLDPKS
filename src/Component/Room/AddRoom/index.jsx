import { useState, useContext } from "react";
import { GlobalData } from "../../GlobalContext";
import s from "./index.module.scss"
function AddRoom({hideAddRoom}) {
    const [roomName, setRoomName] = useState('');
    const [roomType, setRoomType] = useState('Single');
    const [roomPrice, setRoomPrice] = useState('');
    const {addRoom} = useContext(GlobalData)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Kiểm tra dữ liệu nhập vào
    if (roomName.trim() === '' || roomType.trim() === '' || roomPrice.trim() === '') {
      alert("Không được để trống trường này")
      return
    }
    // Tạo đối tượng phòng mới
    const newRoom = {
      name: roomName,
      type: roomType,
      price: parseFloat(roomPrice),
      id: 0,
      isFree: 1
    };
    // Gọi hàm addRoom với phòng mới
    addRoom(newRoom);
    // Reset form
    setRoomName('');
    setRoomType('Single');
    setRoomPrice('');
    hideAddRoom()
    //hide AddRoom
    hideAddRoom()
  };

  return (
    <div className={s.container}>
    <form onSubmit={handleSubmit} className={s.form}>
      <h2>Thêm phòng mới</h2>
      <div>
        <label htmlFor="roomName">Tên phòng:</label>
        <input
          type="text"
          id="roomName"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="roomType">Loại phòng:</label>
        <select id="roomType" onChange={(e) => setRoomType(e.target.value)}>
            <option value="Single">Đơn</option>
            <option value="Double">Đôi</option>
        </select>
      </div>
      <div>
        <label htmlFor="roomPrice">Giá phòng:</label>
        <input
          type="number"
          id="roomPrice"
          value={roomPrice}
          onChange={(e) => setRoomPrice(e.target.value)}
        />
      </div>
      <button type="submit" className="submit">Submit</button>
      <button className="cancel" onClick={hideAddRoom}>Cancel</button>
    </form>
    </div>
  );
}

export default AddRoom;