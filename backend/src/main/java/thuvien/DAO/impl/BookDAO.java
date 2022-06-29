package thuvien.DAO.impl;

import java.util.List;

import thuvien.DAO.IBookDAO;
import thuvien.mapper.BookMapper;
import thuvien.model.BookModel;

public class BookDAO extends AbstractDAO<BookModel> implements IBookDAO {
	public static BookDAO bookDAO = null;
	public static BookDAO getInstance() {
		if(bookDAO == null) {
			bookDAO = new BookDAO();
		}
		return bookDAO;
	}

	@Override
	public List<BookModel> findAll() {
		String sql = "select * from book order by id desc";
		List<BookModel> list = query(sql, new BookMapper());
		if(list != null) return list;
		return null;
	}
	@Override
	public BookModel findById(long id) {
		String sql = "select * from book where id = ?";
		List<BookModel> list = query(sql, new BookMapper(), id);
		if(list != null) return list.get(0);
		return null;
	}

}
