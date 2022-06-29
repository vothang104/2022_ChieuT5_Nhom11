package thuvien.util;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class GenerateUniqueCardNumber {
	public static int generate(String str) {
		MessageDigest md = null;
		try {
			md = MessageDigest.getInstance("MD5");
			md.update((str + System.currentTimeMillis()).getBytes("UTF-8"));
		} catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		int number = new BigInteger(1, md.digest()).intValue();
		if(number > 0) {
			return number;
		}
		return number * -1;
	}
	public static void main(String[] args) {
		int str = GenerateUniqueCardNumber.generate("Võ Minh Thắng");
		System.out.println(str);
	}
}
