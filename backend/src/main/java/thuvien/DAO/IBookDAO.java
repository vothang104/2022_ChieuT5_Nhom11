package thuvien.DAO;

import java.util.List;

import thuvien.model.BookModel;

public interface IBookDAO extends IGenericDAO<BookModel>{
	List<BookModel> findAll();
	BookModel findById(long id);
}
