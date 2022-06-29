package thuvien.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import thuvien.mail.SendMailText;
import thuvien.model.UserModel;
import thuvien.service.impl.UserService;
import thuvien.util.GenerateUniqueCardNumber;
import thuvien.util.MD5Util;
import thuvien.util.ReadFromJson;

/**
 * Servlet implementation class RegisterController
 */
@WebServlet(urlPatterns = {"/register"})
public class RegisterController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RegisterController() {
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
		response.setCharacterEncoding("UTF-8");
		request.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		
		Gson gson = new Gson();
		PrintWriter writer = response.getWriter();
		BufferedReader reader = request.getReader();
		String userJson = ReadFromJson.toString(reader);
		UserModel user = gson.fromJson(userJson, UserModel.class);
		String password = MD5Util.getInstance().getMD5(user.getPassword());
		user.setPassword(password);
		user.setCardCode("" + GenerateUniqueCardNumber.generate(user.getFullName()));
		user.createReceiveCard(user);
		user.setStatus(1);
		user.setRoleId(2);
		long id = UserService.getInstance().insert(user);
		if(id != 0) {
			user = UserService.getInstance().findById(id);
			user = new UserModel(user.getId(), user.getCardCode(), user.getFullName(), user.getEmail(), user.getPhoneNumber(),
					user.getRoleId(), user.getStatus(), user.getCreatedDate(), user.getReicieveDate());
			writer.write(gson.toJson(user));
			SendMailText.getInstance().sendCardCode(user.getEmail(), user.getCardCode(), user.getCreatedDate().toString(), user.getReicieveDate().toString());
		}else {
			response.setStatus(500);
			writer.write(gson.toJson("Đăng ký không thành công"));
		}
		writer.close();
	}

}
