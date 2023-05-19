/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */

package services;

import com.google.gson.Gson;
import dao.RoomDAO;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import model.Room;

/**
 *
 * @author emsin
 */
@WebServlet(name="room", urlPatterns={"/room"})
public class room extends HttpServlet {
   
    /** 
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code> methods.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
       
    } 

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /** 
     * Handles the HTTP <code>GET</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        processRequest(request, response);
        response.setContentType("application/json");
        Gson gson = new Gson();
        String roomJson = gson.toJson(new RoomDAO().getAllRooms());
        PrintWriter out = response.getWriter();
	out.print(roomJson);
    } 

    /** 
     * Handles the HTTP <code>POST</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        processRequest(request, response);
        response.setContentType("application/json");
        Gson gson = new Gson();
        BufferedReader reader = request.getReader();
        //Get data from fetch body
        Room room = gson.fromJson(reader, Room.class);
        String roomJson;
        String method = request.getParameter("method").toLowerCase();
        switch (method) {
            case "edit":
                roomJson = gson.toJson(new RoomDAO().editRoom(room));
                break;
            case "delete":
                roomJson = gson.toJson(new RoomDAO().deleteRoom(room.getId()));
                break;
            default:
                roomJson = gson.toJson(new RoomDAO().addRoom(room));
                break;
        }
        PrintWriter out = response.getWriter();
	out.print(roomJson);
    }
    /** 
     * Returns a short description of the servlet.
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
