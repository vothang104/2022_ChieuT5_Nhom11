package thuvien.mail;

import java.util.Date;
import java.util.Hashtable;

import  java.util.Hashtable;
import  javax.naming.*;
import  javax.naming.directory.*;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.SimpleEmail;

import thuvien.model.BookModel;
import thuvien.model.BorrowedBookModel;

public class SendMailText {
	public static SendMailText sendMail = null;
	public static SendMailText getInstance() {
		if(sendMail == null) {
			sendMail = new SendMailText();
		}
		return sendMail;
	}
	// gui mai kem ma so the
	public void sendCardCode(String emailReicieve, String cardCode, String createDate, String receiveDate) {
		String subject = "Đăng ký tài khoản thư viện";
		String content = "*Chúc mừng bạn đã đăng ký thành công.\n"
				+ "-Bạn vui lòng nhận thẻ tại thư viện.\n"
				+ "-Ngày tạo thẻ: " + createDate + ".\n"
				+ "-Ngày nhận thẻ: " + receiveDate + ".\n"
				+ "-Để đăng nhập bạn cần mã số thẻ và mật khẩu.\n"
				+ "-Mã số thẻ của bạn là: " + cardCode;
		try {
			 Email email = new SimpleEmail();

	           // Cấu hình thông tin Email Server
	           email.setHostName("smtp.googlemail.com");
	           email.setSmtpPort(465);
	           email.setAuthenticator(new DefaultAuthenticator(Constants.MY_EMAIL,
	                   Constants.MY_PASSWORD));
	           
	           // Với gmail cái này là bắt buộc.
	           email.setSSLOnConnect(true);
	           
	           // Người gửi
	           email.setFrom(Constants.MY_EMAIL);
	           email.setSentDate(new Date(System.currentTimeMillis()));
	           
	           // Tiêu đề
	           email.setCharset("UTF-8");
	           email.setSubject(subject);
	           
	           // Nội dung email
	           email.setMsg(content);
	           
	           // Người nhận
	           email.addTo(emailReicieve);    
	           email.send();
	           System.out.println("send...");
		} catch (Exception e) {
			System.out.println("faild...");
			e.printStackTrace();
		}
	}
	// gui mail noi dung
	public void sendBorrowSuccess(String emailReicieve, BookModel bookModel, BorrowedBookModel borrowedBookModel) {
		String subject = "*Xác nhận mượn sách thành công.";
		String content = "\n-Tiêu đề sách: " + bookModel.getTitle()
						+ "\n-Tác giả: " + bookModel.getAuthor()
						+ "\n-Số lượng: " + borrowedBookModel.getNumbers()
						+"\n-Ngày mượn: " + borrowedBookModel.getBorrowedDate()
						+ "\n-Ngày hoàn trả: " + borrowedBookModel.getBorrowRestore()
						+ "\n*Độc giả vui lòng đến thư viện để nhận sách, khi đi mang theo thẻ thư viện."
						+ "\n*Độc giả vui lòng bảo quản sách cẩn thận và hoàn trả đúng hạn.";
		try {
			 Email email = new SimpleEmail();

	           // Cấu hình thông tin Email Server
	           email.setHostName("smtp.googlemail.com");
	           email.setSmtpPort(465);
	           email.setAuthenticator(new DefaultAuthenticator(Constants.MY_EMAIL,
	                   Constants.MY_PASSWORD));
	           
	           // Với gmail cái này là bắt buộc.
	           email.setSSLOnConnect(true);
	           
	           // Người gửi
	           email.setFrom(Constants.MY_EMAIL);
	           email.setSentDate(new Date(System.currentTimeMillis()));
	           
	           // Tiêu đề
	           email.setCharset("UTF-8");
	           email.setSubject(subject);
	           
	           // Nội dung email
	           email.setMsg(content);
	           
	           // Người nhận
	           email.addTo(emailReicieve);    
	           email.send();
	           System.out.println("send...");
		} catch (Exception e) {
			System.out.println("faild...");
			e.printStackTrace();
		}
	}
	public static void main(String[] args) {
		String email = "ttruong4568@gmail.com";
		SendMailText.getInstance().sendCardCode(email, "4324243", null, null);
	}
}
