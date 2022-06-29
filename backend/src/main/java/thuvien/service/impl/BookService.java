package thuvien.service.impl;

import java.util.List;

import thuvien.DAO.impl.BookDAO;
import thuvien.model.BookModel;
import thuvien.service.IBookService;

public class BookService implements IBookService{
	public static BookService bookService = null;
	public static BookService getInstance() {
		if(bookService == null) {
			bookService = new BookService();
		}
		return bookService;
	}

	@Override
	public List<BookModel> findAll() {
		return BookDAO.getInstance().findAll();
	}
	@Override
	public BookModel findById(long id) {
		return BookDAO.getInstance().findById(id);
	}

}
