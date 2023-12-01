package team.gsk.project.chatting.model.websocket;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class WebSocketHandler extends TextWebSocketHandler {

    private final List<WebSocketSession> sessions = new ArrayList<>(); // WebSocket 세션을 관리하기 위한 리스트

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session); // 새로운 클라이언트 세션이 연결될 때 리스트에 추가
        sendMessageToAll("New user joined!"); // 모든 클라이언트에게 새 유저가 입장했음을 알리는 메시지 전송
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        sendMessageToAll(message.getPayload()); // 클라이언트로부터 메시지를 받으면 모든 클라이언트에게 해당 메시지 전송
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session); // 클라이언트 세션이 종료되면 리스트에서 제거
        sendMessageToAll("User left!"); // 모든 클라이언트에게 유저가 나갔음을 알리는 메시지 전송
    }

    // 모든 클라이언트에게 메시지를 전송하는 메서드
    private void sendMessageToAll(String message) throws IOException {
        for (WebSocketSession session : sessions) {
            session.sendMessage(new TextMessage(message)); // 각 세션에 메시지를 보냄
        }
    }
}
