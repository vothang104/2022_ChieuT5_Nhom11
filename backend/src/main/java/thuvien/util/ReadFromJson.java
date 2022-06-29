package thuvien.util;

import java.io.BufferedReader;
import java.io.IOException;

public class ReadFromJson {
	public static String toString(BufferedReader reader) {
		StringBuilder sb = new StringBuilder();
		try {
			String line;
		    while ((line = reader.readLine()) != null) {
		        sb.append(line);
		    }
		} catch (IOException e) {
			System.out.print(e.getMessage());
		}
		return sb.toString();
	}
}
