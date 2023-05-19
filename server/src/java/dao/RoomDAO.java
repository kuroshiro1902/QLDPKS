/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dao;

import context.DBContext;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import model.Room;

/**
 *
 * @author emsin
 */
public class RoomDAO extends DAO{
    private Room newRoom(ResultSet rs){
        Room room = null;
        try {
            room = new Room(
                        rs.getInt(1),
                        rs.getString(2),
                        rs.getString(3),
                        rs.getFloat(4),
                        rs.getInt(5));
        } catch (Exception e) {}
        return room;
    }
    public boolean updateRoomByQuery(String query){
        int isEffect = 0;
        try {
            Connection conn = new DBContext().getConnection();
            PreparedStatement ps = conn.prepareStatement(query);
            isEffect = ps.executeUpdate();
        } catch (Exception e) {}
        return isEffect>0;
    }
    private Room getRoomByQuery(String query){
        ResultSet rs = this.getResult(query);
        try {
            while(rs.next()){
                return this.newRoom(rs);
            }
        } catch (Exception e) {}
        return null;
    }
    private List<Room> getListByQuery(String query){
        List<Room> list = new ArrayList<>();
        ResultSet rs = this.getResult(query);
        try {
            while(rs.next()){
                list.add(this.newRoom(rs));
            }
        } catch (Exception e) {}
        return list;
    }
    public Room addRoom(Room room){
        String query = "insert into Room values('"
                + room.getName()+"','"
                + room.getType()+"',"
                + room.getPrice() + ","
                +"1)";
        return this.updateRoomByQuery(query)? new Room(room.getId(), room.getName(), room.getType(), room.getPrice(), 1) : null;
        
    }
    public String editRoom(Room room){
        String query =  "update room set \n"
                        +"name = '"+room.getName()+"',"
                        +"type = '"+room.getType()+"',"
                        +"price = "+room.getPrice()+"\n"
                        +"where id = "+room.getId();
        return this.updateRoomByQuery(query)? query: null;
        
    }
    public Room deleteRoom(int id){
        Room room = this.getRoomById(id);
        String query = "delete from Room where id = "+id;
        this.updateRoomByQuery(query);
        return room;
    }
    public List<Room> getAllRooms(){
        return this.getListByQuery("select * from Room");
    }
    public Room getRoomById(int id){
        return this.getRoomByQuery("select * from Room where id = "+id);
    }
}
