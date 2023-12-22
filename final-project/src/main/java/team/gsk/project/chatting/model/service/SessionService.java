package team.gsk.project.chatting.model.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

// 전체 채팅을 위한 세션 

@Service
public class SessionService implements ApplicationListener<SessionConnectEvent> {

    // 클라이언트의 sessionId를 저장할 Set 자료구조
    private final Set<String> sessions = new HashSet<>();
    
    private final SimpMessagingTemplate messagingTemplate;

    // 의존성 주입
    public SessionService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // 클라이언트가 WebSocket에 연결될 때 호출되는 메서드
    @Override
    public void onApplicationEvent(SessionConnectEvent event) {
        // 클라이언트의 sessionId를 가져와서 저장
        String sessionId = event.getMessage().getHeaders().get("simpSessionId").toString();
        sessions.add(sessionId); // Set에 추가
        
        sendUserJoinMessage(sessionId); // 사용자 입장 메시지 전송
        
        updateConnectedUsers(); // 연결된 클라이언트 수 업데이트
    }

    // 클라이언트가 연결을 끊을 때 호출되는 메서드
    @EventListener
    public void handleDisconnectEvent(SessionDisconnectEvent event) {
        String sessionId = event.getSessionId(); // 연결 끊긴 클라이언트의 sessionId 가져오기
        sessions.remove(sessionId); // Set에서 제거
        
        sendUserLeaveMessage(sessionId); // 사용자 퇴장 메시지 전송
        
        updateConnectedUsers(); // 연결된 클라이언트 수 업데이트
    }

    // 연결된 클라이언트 수를 실시간으로 클라이언트에게 전송하는 메서드
    private void updateConnectedUsers() {
        messagingTemplate.convertAndSend("/topic/connectedUsers", sessions.size());
    }
    
//    // 최초 숫자 반환
//    @MessageMapping("/getConnectedUsers")
//    public void getConnectedUsers() {
//        messagingTemplate.convertAndSend("/topic/connectedUsers", sessions.size());
//    }
    
    
    // 사용자 입장 메시지 전송
    private void sendUserJoinMessage(String sessionId) {
        messagingTemplate.convertAndSend("/topic/userJoin", "User joined: " + sessionId);
    }

    // 사용자 퇴장 메시지 전송
    private void sendUserLeaveMessage(String sessionId) {
        messagingTemplate.convertAndSend("/topic/userLeave", "User left: " + sessionId);
    }
    
    
    // 
    
    
}