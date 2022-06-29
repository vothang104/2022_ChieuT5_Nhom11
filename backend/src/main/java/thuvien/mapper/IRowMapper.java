package thuvien.mapper;

import java.sql.ResultSet;

public interface IRowMapper<T> {
	T rowMapper(ResultSet res);
}
