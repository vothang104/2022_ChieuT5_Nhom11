package thuvien.DAO.impl;

import java.util.List;

import thuvien.DAO.IBorrowedBookDAO;
import thuvien.mapper.BorrowedBookMapper;
import thuvien.model.BorrowedBookModel;

public class BorrowedBookDAO extends AbstractDAO<BorrowedBookModel> implements IBorrowedBookDAO{
	public static BorrowedBookDAO borrowedBookDAO = null;
	public static BorrowedBookDAO getInstance() {
		if(borrowedBookDAO == null) {
			borrowedBookDAO = new BorrowedBookDAO();
		}
		return borrowedBookDAO;
	}
	
	@Override
	public List<BorrowedBookModel> findAll() {
		String sql = "SELECT * FROM borrowed_book";
		List<BorrowedBookModel> list = query(sql, new BorrowedBookMapper());
		if(list != null) return list;
		return null;
	}
	@Override
	public long insert(BorrowedBookModel borrowedBookModel) {
		String sql = "insert into borrowed_book(numbers, borrowed_date, borrowed_restore, user_id, book_id, borrow_status) "
				+ "values (?, ?, ?, ?, ?, ?)";
		long id = insert(sql, borrowedBookModel.getNumbers(), borrowedBookModel.getBorrowedDate(), borrowedBookModel.getBorrowRestore(),
				borrowedBookModel.getUserId(), borrowedBookModel.getBookId(), borrowedBookModel.getBorrowStatus());
		return id;
	}
	@Override
	public BorrowedBookModel findById(long id) {
		String sql = "select * from borrowed_book where id = ?";
		List<BorrowedBookModel> list = query(sql, new BorrowedBookMapper(), id);
		if(list != null) return list.get(0);
		return null;
	}
	@Override
	public List<BorrowedBookModel> findAllBorrowActiveByIdUser(long idUser) {
		String sql = "select * from borrowed_book where user_id = ? and borrow_status = 0";
		List<BorrowedBookModel> list = query(sql, new BorrowedBookMapper(), idUser);
		if(list != null) return list;
		return null;
	}
	@Override
	public List<BorrowedBookModel> findAllAcive() {
		String sql = "select * from borrowed_book where borrow_status = 0";
		List<BorrowedBookModel> list = query(sql, new BorrowedBookMapper());
		if(list != null) return list;
		return null;
	}

}
