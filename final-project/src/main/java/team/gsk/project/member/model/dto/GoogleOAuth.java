package team.gsk.project.member.model.dto;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class GoogleOAuth {

	private final String googleLoginUrl = "https://accounts.google.com";
	private final String GOOGLE_TOKEN_REQUEST_URL = "https://oauth2.googleapis.com/token";
	private final String GOOGLE_USERINFO_REQUEST_URL = "https://www.googleapis.com/oauth2/v1/userinfo";
	private final ObjectMapper objectMapper;
	private final RestTemplate restTemplate;
	@Value("${app.google.clientId}")
	private String googleClientId;
	@Value("${app.google.redirect}")
	private String googleRedirectUrl;
	@Value("${app.google.secret}")
	private String googleClientSecret;
	
}
