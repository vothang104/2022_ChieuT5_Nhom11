package thuvien.service;

import java.util.List;

import thuvien.model.BorrowedBookModel;

public interface IBorrowedBookService {
	List<BorrowedBookModel> findAll();
	List<BorrowedBookModel> findAllActive();
	long insert(BorrowedBookModel borrowBookModel);
	BorrowedBookModel findById(long id);
	List<BorrowedBookModel> findAllBorrowActiveByIdUser(long idUser);
}
