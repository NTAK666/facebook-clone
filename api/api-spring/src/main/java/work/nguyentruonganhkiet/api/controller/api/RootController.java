package work.nguyentruonganhkiet.api.controller.api;


import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import work.nguyentruonganhkiet.api.model.dtos.responses.MessageReturnDto;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestControllerAdvice
public class RootController {
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public MessageReturnDto<?> handleException( MethodArgumentNotValidException ex ) {
		return MessageReturnDto.getUnvalidReturn(ex.getBindingResult().getFieldErrors());
	}
}
