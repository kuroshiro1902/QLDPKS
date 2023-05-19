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
import model.Revenue;
import model.Room;

/**
 *
 * @author emsin
 */
public class RevenueDAO extends DAO{
    private Revenue newRevenue(ResultSet rs){
        Revenue revenue = null;
        try {
            revenue = new Revenue(
                        rs.getInt(1),
                        rs.getString(2),
                        rs.getFloat(3));
        } catch (Exception e) {}
        return revenue;
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
    private Revenue getRevenueByQuery(String query){
        ResultSet rs = this.getResult(query);
        try {
            while(rs.next()){
                return this.newRevenue(rs);
            }
        } catch (Exception e) {}
        return null;
    }
    private List<Revenue> getListByQuery(String query){
        List<Revenue> list = new ArrayList<>();
        ResultSet rs = this.getResult(query);
        try {
            while(rs.next()){
                list.add(this.newRevenue(rs));
            }
        } catch (Exception e) {}
        return list;
    }
    public float getSumRevenueByMonth(int month){
        String query = "SELECT SUM(revenue) AS total_revenue FROM revenue WHERE MONTH(date) = "+month;
        float revenue = 0f;
        ResultSet rs = this.getResult(query);
        try {
            while(rs.next()){
                revenue = rs.getFloat(1);
            }
        } catch (Exception e) {}
        return revenue;
    }
    public float getCountRevenueByMonth(int month){
        String query = "SELECT COUNT(*) AS total_rows FROM revenue WHERE MONTH(date) = "+month;
        int revenue = 0;
        ResultSet rs = this.getResult(query);
        try {
            while(rs.next()){
                revenue = rs.getInt(1);
            }
        } catch (Exception e) {}
        return revenue;
    }
}
