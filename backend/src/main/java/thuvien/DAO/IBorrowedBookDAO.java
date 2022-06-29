package thuvien.DAO;

import java.util.List;

import thuvien.model.BorrowedBookModel;

public interface IBorrowedBookDAO extends IGenericDAO<BorrowedBookModel>{
	List<BorrowedBookModel> findAll();
	List<BorrowedBookModel> findAllAcive();
	long insert(BorrowedBookModel borrowedBookModel);
	BorrowedBookModel findById(long id);
	List<BorrowedBookModel> findAllBorrowActiveByIdUser(long idUser);
}
