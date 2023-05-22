/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dao;

import context.DBContext;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import model.Customer;

/**
 *
 * @author emsin
 */
public class CustomerDAO extends DAO{
        private Customer newAccount(ResultSet rs) {
        Customer a = null;
        try {
            a = new Customer(
                    rs.getInt(1),
                    rs.getString(2),
                    rs.getString(3),
                    rs.getInt(1)
            );
        } catch (Exception e) {
        }
        return a;
    }
    public String getCurrentTime(){
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String formattedDate = currentDate.format(formatter);
        return formattedDate;
    }
    public boolean updateCustomerByQuery(String query){
        int isEffect = 0;
        try {
            Connection conn = new DBContext().getConnection();
            PreparedStatement ps = conn.prepareStatement(query);
            isEffect = ps.executeUpdate();
        } catch (Exception e) {}
        return isEffect>0;
    }
    private Customer getCustomerByQuery(String query) {
        ResultSet rs = this.getResult(query);
        try {
            while (rs.next()) {
                return this.newAccount(rs);
            }
        } catch (Exception e) {
        }
        return null;
    }
    public Customer getCustomerByRoomId(int roomid){
        String query = "select * from Customer where room_id = "+roomid;
        return this.getCustomerByQuery(query);
    }
    public String bookingRoom(Customer customer){
        String query1 = "insert into Customer values ('"
                + customer.getName()+"','"
                + customer.getPhone()+"',"
                + customer.getRoom_id()+")";
        if (this.updateCustomerByQuery(query1)){
            try {
                String query2 = "update room set isFree = 11 where id =" + customer.getRoom_id();
                new RoomDAO().updateRoomByQuery(query2);
                return query2;
            } catch (Exception e) {
                return "Update room failed";
            } 
        }
        else
        return query1;
    }
    
    public String checkIn(Customer customer){
        String query = "delete from customer where room_id = "+customer.getRoom_id();
        this.updateCustomerByQuery(query);
        String query1 = "insert into Customer values ('"
                + customer.getName()+"','"
                + customer.getPhone()+"',"
                + customer.getRoom_id()+")";
        if (this.updateCustomerByQuery(query1)){
            try {
                String query2 = "update room set isFree = 0 where id =" + customer.getRoom_id();
                RoomDAO rd = new RoomDAO();
                rd.updateRoomByQuery(query2);
                String query3 = "insert into Revenue values ('"+this.getCurrentTime()+"',"+ rd.getRoomById(customer.getRoom_id()).getPrice()+")";
                rd.updateRoomByQuery(query3);
                return query3;
            } catch (Exception e) {
                return "Update room failed";
            } 
        }
        else
        return query1;
    }
    public String waitcheckOut(int roomid){
            try {
                String query = "update room set isFree = 10 where id = " + roomid;
                RoomDAO rd = new RoomDAO();
                rd.updateRoomByQuery(query);
                return query;
            } catch (Exception e) {
                return "Update room failed";
            } 
    }
    public String checkOut(int roomid){
        String query = "delete from Customer where room_id = "+roomid;
        query += "\n update room set isFree = 1 where id = "+roomid;
        this.updateCustomerByQuery(query);
        return query;
    }
    public String cancelCheckIn(Customer customer){
        String query = "delete from Customer where room_id = " + customer.getRoom_id();
        query+= "\n update room set isFree = 1 where id = " + customer.getRoom_id();
        this.updateCustomerByQuery(query);
        return query;
    }
}
