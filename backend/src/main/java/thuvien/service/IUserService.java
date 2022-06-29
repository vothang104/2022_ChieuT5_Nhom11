package thuvien.service;

import thuvien.model.UserModel;

public interface IUserService {
	UserModel checkUser(String email, String password);
	long insert(UserModel userModel);
	UserModel findById(long id);
	UserModel findByCardCode(String cardCode);
}
