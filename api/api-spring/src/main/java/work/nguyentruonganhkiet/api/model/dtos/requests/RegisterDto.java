package work.nguyentruonganhkiet.api.model.dtos.requests;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter

public class RegisterDto {

	private String email;

	private String password;

	private String firstName;

	private String lastName;

	private Date birthday;

	private boolean gender;

}


