package work.nguyentruonganhkiet.api.model.dtos.responses.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import work.nguyentruonganhkiet.api.model.dtos.responses.entities.UserHaftDto;
import work.nguyentruonganhkiet.api.model.enums.FriendStatus;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@ToString
public class FriendDto implements Serializable {
	private Long id;
	private Timestamp createdAt;
	private Timestamp updatedAt;
	private boolean isDelete = false;
	private FriendStatus status;
	private Set<UserHaftDto> users = new LinkedHashSet<>();
}
