package thuvien.mapper;

import java.sql.ResultSet;
import java.sql.Timestamp;

import thuvien.model.BorrowedBookModel;

public class BorrowedBookMapper implements IRowMapper<BorrowedBookModel>{

	@Override
	public BorrowedBookModel rowMapper(ResultSet res) {
		try {
			long id = res.getLong("id");
			int numbers = res.getInt("numbers");
			Timestamp borrowedDate = res.getTimestamp("borrowed_date");
			Timestamp borrowRestore = res.getTimestamp("borrowed_restore");
			long userId = res.getLong("user_id");
			long bookId = res.getLong("book_id");
			int borrowStatus = res.getInt("borrow_status");
			return new BorrowedBookModel(id, numbers, borrowedDate, borrowRestore, userId, bookId, borrowStatus);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
