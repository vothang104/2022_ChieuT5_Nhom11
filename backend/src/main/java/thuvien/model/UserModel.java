package thuvien.model;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;

public class UserModel extends AbstractModel implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String cardCode;
	private String fullName;
	private String email;
	private String phoneNumber;
	private String password;
	private Timestamp createdDate;
	private Timestamp reicieveDate;
	private long roleId;
	private int status;
	public UserModel(long id, String cardCode, String fullName, String email, String phoneNumber, String password, long roleId, int status,
			Timestamp createdDate, Timestamp reicieveDate) {
		super(id);
		this.cardCode = cardCode;
		this.fullName = fullName;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.password = password;
		this.createdDate = createdDate;
		this.reicieveDate = reicieveDate;
		this.roleId = roleId;
		this.status = status;
	}
	public UserModel(long id, String cardCode, String fullName, String email, String phoneNumber, long roleId, int status,
			Timestamp createdDate, Timestamp reicieveDate) {
		super(id);
		this.cardCode = cardCode;
		this.fullName = fullName;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.createdDate = createdDate;
		this.reicieveDate = reicieveDate;
		this.roleId = roleId;
		this.status = status;
	}
	public void createReceiveCard(UserModel user) {
		long ONE_DAY_MILLIS = 86400 * 1000;
		Date now = new Date();
		Date then = new Date(now.getTime() + (3 * ONE_DAY_MILLIS));
		user.setCreatedDate(new Timestamp(now.getTime()));
		user.setReicieveDate(new Timestamp(then.getTime()));
	}

	public UserModel(long id) {
		super(id);
	}

	public String getCardCode() {
		return cardCode;
	}
	public void setCardCode(String cardCode) {
		this.cardCode = cardCode;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public long getRoleId() {
		return roleId;
	}
	public void setRoleId(long roleId) {
		this.roleId = roleId;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public Timestamp getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Timestamp createdDate) {
		this.createdDate = createdDate;
	}

	public Timestamp getReicieveDate() {
		return reicieveDate;
	}

	public void setReicieveDate(Timestamp reicieveDate) {
		this.reicieveDate = reicieveDate;
	}

	@Override
	public String toString() {
		return "UserModel [cardCode=" + cardCode + ", fullName=" + fullName + ", email=" + email + ", phoneNumber="
				+ phoneNumber + ", password=" + password + ", createdDate=" + createdDate + ", reicieveDate="
				+ reicieveDate + ", roleId=" + roleId + ", status=" + status + "]";
	}
	
}
