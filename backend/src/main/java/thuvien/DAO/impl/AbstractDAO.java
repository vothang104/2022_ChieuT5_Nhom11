package thuvien.DAO.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import thuvien.DAO.IGenericDAO;
import thuvien.mapper.IRowMapper;
import thuvien.util.ConnectionDB;

public abstract class AbstractDAO<T> implements IGenericDAO<T> {
	public Connection getConnection() {
		return new ConnectionDB().getConnection();
	}
	@Override
	public <T> List<T> query(String sql, IRowMapper<T> rowMapper, Object... parameters) {
		List<T> list = new ArrayList<T>();
		Connection conn = null;
		PreparedStatement state = null;
		ResultSet res = null;
		try {
			conn = getConnection();
			if(conn != null) {
				state = conn.prepareStatement(sql);
				// set parameters
				if(parameters.length > 0) {
					setParameters(state, parameters);
				}
				// execute query
				res = state.executeQuery();
				// loop resultset
				while(res.next()) {
					T model = rowMapper.rowMapper(res);
					list.add(model);
				}
				return list;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			try {
				if(conn != null) conn.close();
				if(res != null) res.close();
				if(state != null) state.close();
			} catch (SQLException e2) {
				e2.printStackTrace();
			}
		}
		return null;
	}
	@Override
	public long insert(String sql, Object... parameters) {
		Connection conn = null;
		PreparedStatement state = null;
		ResultSet res = null;
		long id = 0;
		try {
			conn = getConnection();
			if(conn != null) {
				conn.setAutoCommit(false);
				state = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
				// set parametets for state
				if(parameters.length > 0) {
					setParameters(state, parameters);
				}				
				// get id
				state.executeUpdate();
				res = state.getGeneratedKeys();
				while(res.next()) {
					id = res.getLong(1);
				}
				conn.commit();
				return id;
			}
		} catch (Exception e) {
			try {
				conn.rollback();
			} catch (SQLException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}
		finally {
			try {
				if(conn != null) conn.close();
				if(res != null) res.close();
				if(state != null) state.close();
			} catch (SQLException e2) {
				e2.printStackTrace();
			}
		}
		return id;
	}
	@Override
	public int update(String sql, Object... parameters) {
		Connection conn = null;
		PreparedStatement state = null;
		ResultSet res = null;
		int result = 0;
		try {
			conn = getConnection();
			if(conn != null) {
				conn.setAutoCommit(false);
				state = conn.prepareStatement(sql);
				// set parametets for state
				if(parameters.length > 0) {
					setParameters(state, parameters);
				}				
				// get id
				result = state.executeUpdate();
				conn.commit();
			}
			return result;
		} catch (Exception e) {
			try {
				conn.rollback();
			} catch (SQLException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}
		finally {
			try {
				if(conn != null) conn.close();
				if(res != null) res.close();
				if(state != null) state.close();
			} catch (SQLException e2) {
				e2.printStackTrace();
			}
		}
		return result;
	}
	private void setParameters(PreparedStatement state, Object ...parameters) {
		try {
			for(int i = 0; i < parameters.length; i++) {
				if(parameters[i] instanceof Long) {
					state.setLong(i + 1 ,(Long) parameters[i]);
				}else if(parameters[i] instanceof String) {
					state.setString(i + 1, (String) parameters[i]);
				}else if(parameters[i] instanceof Integer) {
					state.setInt(i + 1, (int) parameters[i]);
				}else if(parameters[i] instanceof Timestamp) {
					state.setTimestamp(i + 1, (Timestamp) parameters[i]);
				}else if(parameters[i] == null) {
					state.setNull(i + 1, Types.NULL);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}
}
