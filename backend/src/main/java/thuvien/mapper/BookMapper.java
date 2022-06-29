package thuvien.mapper;

import java.sql.ResultSet;
import java.sql.Timestamp;

import thuvien.model.BookModel;

public class BookMapper implements IRowMapper<BookModel>{

	@Override
	public BookModel rowMapper(ResultSet res) {
		try {
			long id = res.getLong("id");
			String title = res.getString("title");
			String description = res.getString("book_description");
			String author = res.getString("author");
			String thumbnail = res.getString("thumbnail");
			int numbers = res.getInt("numbers");
			Timestamp publishedDate = res.getTimestamp("published_date");
			String publishedCompany = res.getString("published_company");
			long price = res.getLong("price");
			long categoryId = res.getLong("category_id");
			return new BookModel(id, title, description, author, thumbnail, numbers, publishedDate, publishedCompany, price, categoryId);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
