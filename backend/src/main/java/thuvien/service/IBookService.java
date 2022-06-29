package thuvien.service;

import java.util.List;

import thuvien.model.BookModel;

public interface IBookService {
	List<BookModel> findAll();
	BookModel findById(long id);
}
