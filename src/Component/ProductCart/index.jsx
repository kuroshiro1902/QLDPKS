import "./index.scss"
function ProductCart({room}) {
  const isFree = room.isFree ===1? "Còn phòng" : "Hết phòng"
    return ( <button className="product-card" data-room-id={room.id} data-room-isfree={room.isFree}>
    <h3 className="product-name">{room.name}</h3>
    <p className="product-type">Loại: {room.type}</p>
    <p className="product-price">$ {room.price}</p>
    <p className={`product-status ${room.isFree===1?"isFree":""}`}>{isFree}</p>
  </button> );
}

export default ProductCart;