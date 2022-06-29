package thuvien.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import thuvien.mail.SendMailText;
import thuvien.model.BookModel;
import thuvien.model.BorrowedBookModel;
import thuvien.model.UserModel;
import thuvien.service.impl.BookService;
import thuvien.service.impl.BorrowBookService;
import thuvien.service.impl.UserService;
import thuvien.util.JWTUtil;
import thuvien.util.ReadFromJson;

/**
 * Servlet implementation class BorrowBookController
 */
@WebServlet(urlPatterns = {"/borrow"})
public class BorrowBookController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BorrowBookController() {
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
		
		Gson gson = new Gson();
		PrintWriter writer = response.getWriter();
		// verify token
		String token = request.getHeader("token").split(" ")[1];
		boolean verifyToken = JWTUtil.getInstance().verifyToken(token);
		if(verifyToken) {
			BufferedReader reader = request.getReader();
			String data = ReadFromJson.toString(reader);
			BorrowedBookModel borrowBook = gson.fromJson(data, BorrowedBookModel.class);
			// kiem tra nguoi dung dang muon sach
			List<BorrowedBookModel> checkBorrowing = BorrowBookService.getInstance().findAllBorrowActiveByIdUser(borrowBook.getUserId());
			if(checkBorrowing.size() > 0) {
				response.setStatus(500);
				writer.write(gson.toJson("Vui lòng hoàn trả sách trước khi mượn sách khác"));
				return;
			}
			
			long id = BorrowBookService.getInstance().insert(borrowBook);
			if(id > 0) {
				BookModel bookModel = BookService.getInstance().findById(borrowBook.getBookId());
				borrowBook = BorrowBookService.getInstance().findById(id);
				UserModel userModel = UserService.getInstance().findById(borrowBook.getUserId());
				SendMailText.getInstance().sendBorrowSuccess(userModel.getEmail(), bookModel, borrowBook);
				response.setStatus(200);
				writer.write(gson.toJson(borrowBook));
			}
		}else {
			response.setStatus(403);
			writer.write(gson.toJson("Bạn chưa được xác thực"));
		}
		writer.close();
	}

}
