package work.nguyentruonganhkiet.api.controller.ws;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class RegisterWebsocketController {

    @MessageMapping("/connected")
    @SendTo("/channel/public")
    public String register(String name) {
        return "User Connected: " + name;
    }
}
