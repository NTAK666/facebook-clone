package work.nguyentruonganhkiet.api.controller.ws.listener;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import work.nguyentruonganhkiet.api.model.entities.Message;


@Component
public class WebsocketEventListener {

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;
    private static final Logger logger = LoggerFactory.getLogger(WebsocketEventListener.class);

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        logger.info("Received a new web socket connection");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        String username = (String) headerAccessor.getSessionAttributes().get("username");
        if (username != null) {
            Message chatMessage = new Message();
            chatMessage.setMessage("Leave");
            messagingTemplate.convertAndSend("/channel/public", chatMessage);
        }
    }

}
