package thuvien.DAO;

import java.util.List;

import thuvien.model.UserModel;

public interface IUserDAO extends IGenericDAO<UserModel>{
	List<UserModel> findAll();
	UserModel findById(long id);
	void update(UserModel userModel);
	long insert(UserModel userModel);
	UserModel findByCardCode(String cardCode);
	UserModel checkUser(String email, String password);
}
