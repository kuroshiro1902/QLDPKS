export class RoomController{
    constructor(action) {
      switch (action) {
        case "booking":
          [this.action,this.label,this.state,this.classname] = ["booking","Đặt phòng","Còn phòng","submit"]
          break;
        case "cancel":
          [this.action,this.label,this.state,this.classname] = ["cancel","Trả phòng","Đã đặt","delete"]
          break
        case "checkin":
          [this.action,this.label,this.state,this.classname] = ["checkin","Check in","Đợi check in","pending"]
          break
        case "checkout":
          [this.action,this.label,this.state,this.classname] = ["checkout","Check out","Đợi check out","pending"]
        default:
          break;
      }
    }
  }
export default {
    1: new RoomController("booking"),
    0: new RoomController("cancel"),
    11:new RoomController("checkin"),
    10:new RoomController("checkout"),
  }