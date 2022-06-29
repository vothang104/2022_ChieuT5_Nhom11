package thuvien.service.impl;

import java.util.List;

import thuvien.DAO.impl.CategoryDAO;
import thuvien.model.CategoryModel;
import thuvien.service.ICategoryService;

public class CategoryService implements ICategoryService{
	public static CategoryService categoryService = null;
	public static CategoryService getInstance() {
		if(categoryService == null) {
			categoryService = new CategoryService();
		}
		return categoryService;
	}

	@Override
	public List<CategoryModel> findAll() {
		return CategoryDAO.getInstance().findAll();
	}
	public static void main(String[] args) {
		List<CategoryModel> list = CategoryService.getInstance().findAll();
		for(int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i).getName());
		}
	}
}
