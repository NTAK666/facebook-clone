package work.nguyentruonganhkiet.api.model.dtos.requests;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class AddFriendRequestDto {

	@NotNull
	private String email;

}
