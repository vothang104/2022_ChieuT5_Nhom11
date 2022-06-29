package thuvien.DAO;

import java.util.List;

import thuvien.mapper.IRowMapper;

public interface IGenericDAO<T> {
	<T> List<T> query(String sql, IRowMapper<T> rowMapper, Object ...parameters);
	long insert(String sql, Object ...parameters);
	int update(String sql, Object ...parameters);
}
