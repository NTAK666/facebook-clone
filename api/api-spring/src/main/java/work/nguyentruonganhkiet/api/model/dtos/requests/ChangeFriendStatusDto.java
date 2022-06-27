package work.nguyentruonganhkiet.api.model.dtos.requests;


import lombok.Getter;
import lombok.Setter;
import work.nguyentruonganhkiet.api.model.enums.FriendStatus;

@Getter
@Setter
public class ChangeFriendStatusDto {

	private FriendStatus status;
	private String emailTarget;

}
