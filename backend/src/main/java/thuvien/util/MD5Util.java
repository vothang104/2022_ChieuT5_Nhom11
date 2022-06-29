package thuvien.util;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5Util {
	public static MD5Util md5 = null;
	public static MD5Util getInstance() {
		if(md5 == null) {
			md5 = new MD5Util();
		}
		return md5;
	}
	// phuong thuc chung
	public String getMD5(String input) {
		try {
			MessageDigest md = MessageDigest.getInstance("md5");
			byte[] messageDigest = md.digest(input.getBytes());
			BigInteger no = new BigInteger(1, messageDigest);
			String hashText = no.toString(16);
			while(hashText.length() < 32) {
				hashText = "0" + hashText;
			}
			return hashText;
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}
