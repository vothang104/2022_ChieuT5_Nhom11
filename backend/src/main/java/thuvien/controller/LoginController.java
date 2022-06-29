package thuvien.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.crypto.Data;

import com.google.gson.Gson;

import thuvien.model.UserModel;
import thuvien.service.impl.UserService;
import thuvien.util.JWTUtil;
import thuvien.util.MD5Util;
import thuvien.util.ReadFromJson;

/**
 * Servlet implementation class LoginController
 */
@WebServlet(urlPatterns = { "/login" })
public class LoginController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public LoginController() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");

		PrintWriter writer = response.getWriter();
		Gson gson = new Gson();
		BufferedReader reader = request.getReader();
		String data = ReadFromJson.toString(reader);
		UserModel user = gson.fromJson(data, UserModel.class);
		String password = user.getPassword();
		
		// encoded password md5
		String passwordMD5 = MD5Util.getInstance().getMD5(user.getPassword());
		UserModel userChecked = UserService.getInstance().checkUser(user.getCardCode(), passwordMD5);
		if (userChecked != null) {
			user = new UserModel(userChecked.getId(), userChecked.getCardCode(), userChecked.getFullName(), userChecked.getEmail(), userChecked.getPhoneNumber(),
					userChecked.getRoleId(), userChecked.getStatus(), userChecked.getCreatedDate(), userChecked.getReicieveDate());
			// create jwt
			String accessToken = JWTUtil.getInstance().createJWT(user.getCardCode(), password, user.getRoleId());
			Map<String, Object> dataResponse = new HashMap<String, Object>();
			dataResponse.put("user", user);
			dataResponse.put("accessToken", accessToken);
			response.setStatus(200);
			writer.write(gson.toJson(dataResponse));
		} else {
			response.setStatus(403);
			writer.write(gson.toJson("Mã số thẻ hoặc mật khẩu không đúng"));
		}

		writer.close();
	}

}
