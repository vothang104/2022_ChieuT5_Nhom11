package thuvien.service.impl;

import java.sql.Timestamp;
import java.util.Date;

import thuvien.DAO.impl.UserDAO;
import thuvien.model.UserModel;
import thuvien.service.IUserService;

public class UserService implements IUserService{
	public static UserService userService = null;
	public static UserService getInstance() {
		if(userService == null) {
			userService = new UserService();
		}
		return userService;
	}

	@Override
	public UserModel checkUser(String cardCode, String password) {
		return UserDAO.getInstance().checkUser(cardCode, password);
	}

	@Override
	public long insert(UserModel userModel) {
		return UserDAO.getInstance().insert(userModel);
	}

	@Override
	public UserModel findById(long id) {
		return UserDAO.getInstance().findById(id);
	}
	@Override
	public UserModel findByCardCode(String cardCode) {
		return UserDAO.getInstance().findByCardCode(cardCode);
	}
	public static void main(String[] args) {
//		long ONE_DAY_MILLIS = 86400 * 1000;
//		Date now = new Date();
//		Date then = new Date(now.getTime() + (3 * ONE_DAY_MILLIS));
//		UserModel user = new UserModel(0, "43423", "Vo Minh Thang", "vothang@gmail.com", "0358500771", "vothang104", 2, 1,
//				new Timestamp(System.currentTimeMillis()), new Timestamp(then.getTime()));
//		long idUser = UserService.getInstance().insert(user);
//		System.out.println(idUser);
		String cardCode = "1711205701";
		UserModel userModel = UserService.getInstance().findByCardCode(cardCode);
		System.out.println(userModel);
	}
	
}
