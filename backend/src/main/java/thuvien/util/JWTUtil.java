package thuvien.util;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import java.util.ResourceBundle;
import java.util.UUID;

import javax.crypto.spec.SecretKeySpec;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import thuvien.model.UserModel;
import thuvien.service.impl.UserService;

public class JWTUtil {
	ResourceBundle bundle = ResourceBundle.getBundle("key");
	private String secretKey;
	public JWTUtil() {
		this.secretKey = bundle.getString("secret_key");
	}
	public static JWTUtil jwt = null;
	public static JWTUtil getInstance() {
		if(jwt == null) {
			jwt = new JWTUtil();
		}
		return jwt;
	}
	// create jwt
	public String createJWT(String cardCode, String password, long role) {
		Key hmacKey = new SecretKeySpec(Base64.getDecoder().decode(this.secretKey), SignatureAlgorithm.HS256.getJcaName());

		Instant now = Instant.now();
		String jwtToken = Jwts.builder()
		        .claim("cardCode", cardCode)
		        .claim("password", password)
		        .claim("role", role)
		        .setId(UUID.randomUUID().toString())
		        .setIssuedAt(Date.from(now))
		        .setExpiration(Date.from(now.plus(30, ChronoUnit.DAYS)))
		        .signWith(hmacKey)
		        .compact();
		return jwtToken;
	}
	// parse jwt
	public Jws<Claims> parseJwt(String jwtString) {
			Key hmacKey = new SecretKeySpec(Base64.getDecoder().decode(this.secretKey), SignatureAlgorithm.HS256.getJcaName());

		    Jws<Claims> jwt = Jwts.parserBuilder()
		            .setSigningKey(hmacKey)
		            .build()
		            .parseClaimsJws(jwtString);
		    return jwt;
	}
	public boolean verifyToken(String accessToken) {
		Jws<Claims> jwtParse = null;
		try {
			jwtParse = JWTUtil.getInstance().parseJwt(accessToken);
		} catch (Exception e) {
			return false;
		}
		String cardCode = jwtParse.getBody().get("cardCode").toString();
		if(cardCode.equals("")) return false;
		UserModel userModel = UserService.getInstance().findByCardCode(cardCode);
		if(userModel != null) {
			return true;
		}else {
			return false;
		}
	}
	public static void main(String[] args) {
//		String jwt = JWTUtil.getInstance().createJWT("123", "456", 2);
//		System.out.println(jwt);
//		String accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJjYXJkQ29kZSI6IjEyMyIsInBhc3N3b3JkIjoiNDU2Iiwicm9sZSI6MiwianRpIjoiNjkxMzliZGQtYjBjMy00YzZkLThlNjYtZGU0ODE5ZjQ3ZTAzIiwiaWF0IjoxNjU2MjQ2Nzg1LCJleHAiOjE2NTg4Mzg3ODV9.wG1t3WQfCAFZ23F_k3KC-JEAWuSvU-0J6JxWDcZYqBI";
		boolean verifyToken = JWTUtil.getInstance().verifyToken("eyJhbGciOiJIUzI1NiJ9.eyJjYXJkQ29kZSI6IjE3MTEyMDU3MDEiLCJwYXNzd29yZCI6InRyaTEwMTAiLCJyb2xlIjoyLCJqdGkiOiIyYTExZGU1My0wNGM1LTQ4MzktYWFjOC01ZDBmMWJlYjA4OWYiLCJpYXQiOjE2NTYzODM2NjEsImV4cCI6MTY1ODk3NTY2MX0.rz0iCezaO1i63WomOkZWsUEEo0yW-wcfSTKszGBRHoA");
		System.out.println(verifyToken);
	}
}
