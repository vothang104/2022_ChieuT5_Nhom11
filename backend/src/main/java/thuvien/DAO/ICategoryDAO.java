package thuvien.DAO;

import java.util.List;

import thuvien.model.CategoryModel;

public interface ICategoryDAO extends IGenericDAO<CategoryModel>{
	List<CategoryModel> findAll();
}
