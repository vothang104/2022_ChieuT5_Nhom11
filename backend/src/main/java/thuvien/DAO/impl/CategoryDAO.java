package thuvien.DAO.impl;

import java.util.List;

import thuvien.DAO.ICategoryDAO;
import thuvien.mapper.CategoryMapper;
import thuvien.model.CategoryModel;

public class CategoryDAO extends AbstractDAO<CategoryModel> implements ICategoryDAO{
	public static CategoryDAO categoryDAO = null;
	public static CategoryDAO getInstance() {
		if(categoryDAO == null) {
			categoryDAO = new CategoryDAO();
		}
		return categoryDAO;
	}

	@Override
	public List<CategoryModel> findAll() {
		String sql = "select * from category";
		List<CategoryModel> list = query(sql, new CategoryMapper());
		if(list.size() > 0) return list;
		return null;
	}

}
