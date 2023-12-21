package team.gsk.project.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // WebSocket 메시지 브로커 설정
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic","/sub"); // 메시지 브로커 활성화, "/topic"을 구독하는 클라이언트에게 메시지 전달
        config.setApplicationDestinationPrefixes("/app","/pub"); // 클라이언트가 메시지를 보낼 엔드포인트 설정
    }

    // WebSocket 엔드포인트 등록
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
      registry.addEndpoint("/chat").withSockJS(); // "/chat" 엔드포인트를 통해 WebSocket 연결 설정, SockJS 지원
      
      // stomp 접속 주소 url => /ws-stomp
      registry.addEndpoint("/ws-stomp") // 연결될 엔드포인트
      .withSockJS(); // SocketJS 를 연결한다는 설정
 

    }
}