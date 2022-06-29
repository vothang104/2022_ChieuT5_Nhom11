package thuvien.mapper;

import java.sql.ResultSet;

import thuvien.model.CategoryModel;

public class CategoryMapper implements IRowMapper<CategoryModel>{

	@Override
	public CategoryModel rowMapper(ResultSet res) {
		try {
			long id = res.getLong("id");
			String name = res.getString("category_name");
			return new CategoryModel(id, name);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
