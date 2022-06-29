package thuvien.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ResourceBundle;

public class ConnectionDB {
	ResourceBundle resourceBundle = ResourceBundle.getBundle("db");
	public ConnectionDB() {
		
	}
	public Connection getConnection() {
		try {
			Class.forName(resourceBundle.getString("driverName"));
			Connection conn = DriverManager.getConnection(resourceBundle.getString("url"), resourceBundle.getString("user"), resourceBundle.getString("password"));
			return conn;
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}

	public static void main(String[] args) {
		Connection conn = new ConnectionDB().getConnection();
		System.out.println(conn);
	}
	
}
