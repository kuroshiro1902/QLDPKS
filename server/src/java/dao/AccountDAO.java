/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dao;

import java.sql.ResultSet;
import model.Account;

/**
 *
 * @author emsin
 */
public class AccountDAO extends DAO {

    private Account newAccount(ResultSet rs) {
        Account a = null;
        try {
            a = new Account(
                    rs.getInt(1),
                    rs.getString(2),
                    rs.getString(3)
            );
        } catch (Exception e) {
        }
        return a;
    }

    private Account getAccountByQuery(String query) {
        ResultSet rs = this.getResult(query);
        try {
            while (rs.next()) {
                return this.newAccount(rs);
            }
        } catch (Exception e) {
        }
        return null;
    }

    public Account getAccount(String u, String p) {
        try {
            u = "'" + u.toLowerCase() + "'";
            p = "'" + p.toLowerCase() + "'";
            return this.getAccountByQuery("select * from Account where username = " + u + " and password = " + p);
        } catch (Exception e) {
            return null;
        }
        
    }
}
