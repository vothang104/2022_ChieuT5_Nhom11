package thuvien.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import thuvien.util.JWTUtil;

/**
 * Servlet implementation class LogoutController
 */
@WebServlet(urlPatterns = {"/logout"})
public class LogoutController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LogoutController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		
		// logout can truyen token vao header 'Bearer tokenString'
		
		Gson gson = new Gson();
		PrintWriter writer = response.getWriter();
		String token = request.getHeader("token").split(" ")[1];
		boolean verifyToken = JWTUtil.getInstance().verifyToken(token);
		if(verifyToken) {
			response.setStatus(200);
			writer.write(gson.toJson("Đăng xuất thành công"));
		}else {
			response.setStatus(403);
			writer.write(gson.toJson("Xác thực thất bại"));
		}
		writer.close();
	}

}
