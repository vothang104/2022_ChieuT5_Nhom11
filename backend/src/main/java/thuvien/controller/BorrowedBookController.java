package thuvien.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import thuvien.model.BorrowedBookModel;
import thuvien.service.impl.BorrowBookService;

/**
 * Servlet implementation class BorrowedBookController
 */
@WebServlet(urlPatterns = {"/borrowedBook"})
public class BorrowedBookController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BorrowedBookController() {
        super();
        // TODO Auto-generated constructor stub
    }
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		
		Gson gson = new Gson();
		PrintWriter writer = response.getWriter();
		List<BorrowedBookModel> listBorrowedBook = BorrowBookService.getInstance().findAllActive();
		if(listBorrowedBook != null) {
			response.setStatus(200);
			writer.write(gson.toJson(listBorrowedBook));
		}else {
			response.setStatus(500);
			writer.write(gson.toJson(null));
		}
		writer.close();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

}
