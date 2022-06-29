package thuvien.service.impl;

import java.sql.Timestamp;
import java.util.List;

import thuvien.DAO.impl.BorrowedBookDAO;
import thuvien.model.BorrowedBookModel;
import thuvien.service.IBorrowedBookService;

public class BorrowBookService implements IBorrowedBookService{
	public static BorrowBookService borrowBookService = null;
	public static BorrowBookService getInstance() {
		if(borrowBookService == null) {
			borrowBookService = new BorrowBookService();
		}
		return borrowBookService;
	}

	@Override
	public List<BorrowedBookModel> findAll() {
		return BorrowedBookDAO.getInstance().findAll();
	}
	@Override
	public List<BorrowedBookModel> findAllActive() {
		return BorrowedBookDAO.getInstance().findAllAcive();
	}
	@Override
	public long insert(BorrowedBookModel borrowedBookModel) {
		return BorrowedBookDAO.getInstance().insert(borrowedBookModel);
	}
	@Override
	public BorrowedBookModel findById(long id) {
		return BorrowedBookDAO.getInstance().findById(id);
	}
	@Override
	public List<BorrowedBookModel> findAllBorrowActiveByIdUser(long idUser) {
		return BorrowedBookDAO.getInstance().findAllBorrowActiveByIdUser(idUser);
	}
	public static void main(String[] args) {
		BorrowedBookModel b = new BorrowedBookModel(0,  3, new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()), 7, 5, 0);
		long id = BorrowBookService.getInstance().insert(b);
		System.out.println(id);
	}
}
