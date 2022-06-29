package thuvien.DAO.impl;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import thuvien.DAO.IUserDAO;
import thuvien.mapper.UserMapper;
import thuvien.model.UserModel;
import thuvien.service.impl.UserService;

public class UserDAO extends AbstractDAO<UserModel> implements IUserDAO{
	public static UserDAO userDao = null;
	public static UserDAO getInstance() {
		if(userDao == null) {
			userDao = new UserDAO();
		}
		return userDao;
	}

	@Override
	public List<UserModel> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UserModel findById(long id) {
		String sql = "Select * from users where id = ?";
		List<UserModel> list = query(sql, new UserMapper(), id);
		if(list.size() > 0) {
			return list.get(0);
		}
		return null;
	}

	@Override
	public void update(UserModel userModel) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public long insert(UserModel userModel) {
		String sql = "insert into users(card_code, full_name, email, user_password, phone_number, created_date, reicieve_date, role_id, user_status) "
				+ "values(?, ?, ?, ?, ?, ?, ?, ?, ?)";
		return insert(sql, userModel.getCardCode(), userModel.getFullName(), userModel.getEmail(), userModel.getPassword(),
				userModel.getPhoneNumber(),userModel.getCreatedDate(), userModel.getReicieveDate(), userModel.getRoleId(), userModel.getStatus());
	}

	@Override
	public UserModel checkUser(String cardCode, String password) {
		String sql = "select * from users where card_code = ? and user_password = ?";
		List<UserModel> listUser = query(sql, new UserMapper(), cardCode, password);
		if(listUser.size() > 0) {
			return listUser.get(0);
		}
		return null;
	}
	@Override
	public UserModel findByCardCode(String cardCode) {
		String sql = "select * from users where card_code = ?";
		List<UserModel> listUser = query(sql, new UserMapper(), cardCode);
		if(listUser.size() > 0) {
			return listUser.get(0);
		}
		return null;

	}
	public static void main(String[] args) {
		long ONE_DAY_MILLIS = 86400 * 1000;
		Date now = new Date();
		Date then = new Date(now.getTime() + (3 * ONE_DAY_MILLIS));
		UserModel user = new UserModel(0, "43423", "Vo Minh Thang", "vothang@gmail.com", "0358500771", "vothang104", 2, 1,
				new Timestamp(System.currentTimeMillis()), new Timestamp(then.getTime()));
		long idUser = UserDAO.getInstance().insert(user);
		System.out.println(idUser);
	}

}
