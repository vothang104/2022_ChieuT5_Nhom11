package thuvien.model;

import java.sql.Timestamp;

public class BookModel extends AbstractModel{
	private String title;
	private String description;
	private String author;
	private String thumbnail;
	private int numbers;
	private Timestamp publishedDate;
	private String publishedCompany;
	private long price;
	private long categoryId;
	public BookModel(long id, String title, String description, String author, String thumbnail, int numbers,
			Timestamp publishedDate, String publishedCompany, long price, long categoryId) {
		super(id);
		this.title = title;
		this.description = description;
		this.author = author;
		this.thumbnail = thumbnail;
		this.numbers = numbers;
		this.publishedDate = publishedDate;
		this.publishedCompany = publishedCompany;
		this.price = price;
		this.categoryId = categoryId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getThumbnail() {
		return thumbnail;
	}
	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}
	public int getNumbers() {
		return numbers;
	}
	public void setNumbers(int numbers) {
		this.numbers = numbers;
	}
	public Timestamp getPublishedDate() {
		return publishedDate;
	}
	public void setPublishedDate(Timestamp publishedDate) {
		this.publishedDate = publishedDate;
	}
	public String getPublishedCompany() {
		return publishedCompany;
	}
	public void setPublishedCompany(String publishedCompany) {
		this.publishedCompany = publishedCompany;
	}
	public long getPrice() {
		return price;
	}
	public void setPrice(long price) {
		this.price = price;
	}
	public long getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(long categoryId) {
		this.categoryId = categoryId;
	}
	
}
