package work.nguyentruonganhkiet.api.model.dtos.requests;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class LoginDto {

	private String email;
	private String password;

}
