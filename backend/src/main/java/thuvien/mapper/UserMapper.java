package thuvien.mapper;

import java.sql.ResultSet;
import java.sql.Timestamp;

import thuvien.model.UserModel;

public class UserMapper implements IRowMapper<UserModel> {

	@Override
	public UserModel rowMapper(ResultSet res) {
		try {
			long id = res.getLong("id");
			String fullName = res.getString("full_name");
			String password = res.getString("user_password");
			String phoneNumber = res.getString("phone_number");
			String email = res.getString("email");
			String cardCode = res.getString("card_code");
			Timestamp createdDate = res.getTimestamp("created_date");
			Timestamp reicieveDate = res.getTimestamp("reicieve_date");
			long roleId = res.getLong("role_id");
			int status = res.getInt("user_status");
			return new UserModel(id, cardCode, fullName, email, phoneNumber, password, roleId, status, createdDate, reicieveDate);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
