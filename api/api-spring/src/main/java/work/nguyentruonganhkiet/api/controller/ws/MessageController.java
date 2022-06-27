package work.nguyentruonganhkiet.api.controller.ws;


import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import work.nguyentruonganhkiet.api.model.entities.Message;

@Controller
public class MessageController {

	@SendTo("/channel/public")
	@MessageMapping("/chat.sendMessage")
	public Message sendMessage( @Payload Message message ) {
		return message;
	}

}
