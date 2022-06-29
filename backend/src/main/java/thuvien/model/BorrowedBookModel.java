package thuvien.model;

import java.io.Serializable;
import java.sql.Timestamp;

public class BorrowedBookModel extends AbstractModel implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int numbers;
	private Timestamp borrowedDate;
	private Timestamp borrowRestore;
	private long userId;
	private long bookId;
	private int borrowStatus;
	public BorrowedBookModel(long id, int numbers, Timestamp borrowedDate, Timestamp borrowRestore, long userId,
			long bookId, int borrowStatus) {
		super(id);
		this.numbers = numbers;
		this.borrowedDate = borrowedDate;
		this.borrowRestore = borrowRestore;
		this.userId = userId;
		this.bookId = bookId;
		this.borrowStatus = borrowStatus;
	}
	public int getNumbers() {
		return numbers;
	}
	public void setNumbers(int numbers) {
		this.numbers = numbers;
	}
	public Timestamp getBorrowedDate() {
		return borrowedDate;
	}
	public void setBorrowedDate(Timestamp borrowedDate) {
		this.borrowedDate = borrowedDate;
	}
	public Timestamp getBorrowRestore() {
		return borrowRestore;
	}
	public void setBorrowRestore(Timestamp borrowRestore) {
		this.borrowRestore = borrowRestore;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public long getBookId() {
		return bookId;
	}
	public void setBookId(long bookId) {
		this.bookId = bookId;
	}
	public int getBorrowStatus() {
		return borrowStatus;
	}
	public void setBorrowStatus(int borrowStatus) {
		this.borrowStatus = borrowStatus;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
