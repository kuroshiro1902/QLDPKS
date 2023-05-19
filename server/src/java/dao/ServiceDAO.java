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
import model.Service;
/**
 *
 * @author emsin
 */
public class ServiceDAO extends DAO{
    private Service newService(ResultSet rs){
        Service Service = null;
        try {
            Service = new Service(
                        rs.getInt(1),
                        rs.getString(2),
                        rs.getFloat(3),
                        rs.getInt(4));
        } catch (Exception e) {}
        return Service;
    }
    public boolean updateServiceByQuery(String query){
        int isEffect = 0;
        try {
            Connection conn = new DBContext().getConnection();
            PreparedStatement ps = conn.prepareStatement(query);
            isEffect = ps.executeUpdate();
        } catch (Exception e) {}
        return isEffect>0;
    }
    private Service getServiceByQuery(String query){
        ResultSet rs = this.getResult(query);
        try {
            while(rs.next()){
                return this.newService(rs);
            }
        } catch (Exception e) {}
        return null;
    }
    private List<Service> getListByQuery(String query){
        List<Service> list = new ArrayList<>();
        ResultSet rs = this.getResult(query);
        try {
            while(rs.next()){
                list.add(this.newService(rs));
            }
        } catch (Exception e) {}
        return list;
    }
    public String addService(Service service){
        String query = "insert into Service values('"
                + service.getName()+"',"
                + service.getPrice()+","
                + service.getIsAvailable() +")";
        return updateServiceByQuery(query)? query : query;
    }
    public String editService(Service service){
        String query =  "update Service set \n"
                        +"name = '"+service.getName()+"',"
                        +"price = "+service.getPrice()+","
                        +"isAvailable = "+service.getIsAvailable()+" "
                        +"where id = "+service.getId();
        return this.updateServiceByQuery(query)? query: query; 
    }
    public Service deleteService(int serviceid){
        String query = "delete from Service where id = "+serviceid;
        this.updateServiceByQuery(query);
        return this.getServiceById(serviceid);
    }
    public List<Service> getAllServices(){
        return this.getListByQuery("select * from Service");
    }
    public Service getServiceById(int id){
        return this.getServiceByQuery("select * from Service where id = "+id);
    }
}
