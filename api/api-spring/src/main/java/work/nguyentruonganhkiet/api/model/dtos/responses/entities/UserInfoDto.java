package work.nguyentruonganhkiet.api.model.dtos.responses.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;

@Getter
@Setter
@ToString
public class UserInfoDto implements Serializable {
	private Long id;
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
	private boolean gender;
}
