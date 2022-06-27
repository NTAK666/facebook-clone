package work.nguyentruonganhkiet.api.model.dtos.requests;


import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class UpdateUserRequestDto {

	private String firstName;

	private String lastName;

	private String phone;

	private String address;

	private String avatar;

	private String coverImage;

	private String about;

	private String bio;

	private String slug;

	private Date birthday;

	private int gender = -1;

}
