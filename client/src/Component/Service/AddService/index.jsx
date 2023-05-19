import { useState, useContext } from "react";
import { GlobalData } from "../../GlobalContext";
import s from "./index.module.scss"
function Addservice({hideAddservice}) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [isAvailable, setIsAvailable] = useState(1)
    const {addService} = useContext(GlobalData)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Kiểm tra dữ liệu nhập vào
    if (name.trim() === '' || isNaN(Number(price))) {
      alert("Invalid input")
      return
    }
    // Tạo đối tượng phòng mới
    const newservice = {
      name,
      price: parseFloat(price),
      id: 0,
      isAvailable: parseInt(isAvailable)
    };
    // Gọi hàm addservice với phòng mới
    addService(newservice);
    hideAddservice()
  };

  return (
    <div className={s.container}>
    <form onSubmit={handleSubmit} className={s.form}>
      <h2>Thêm dịch vụ mới</h2>
      <div>
        <label htmlFor="name">Tên dịch vụ:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="servicePrice">Giá dịch vụ:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="serviceType">Tình trạng:</label>
        <select id="serviceType" onChange={(e) => setIsAvailable(e.target.value)}>
            <option value="1">Khả dụng</option>
            <option value="0">Bảo trì</option>
        </select>
      </div>
      <button type="submit" className="submit">Submit</button>
      <button className="cancel" onClick={hideAddservice}>Cancel</button>
    </form>
    </div>
  );
}

export default Addservice;