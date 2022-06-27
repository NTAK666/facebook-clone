package work.nguyentruonganhkiet.api.model.dtos.responses.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import work.nguyentruonganhkiet.api.model.entities.Story;
import work.nguyentruonganhkiet.api.model.enums.FriendStatus;
import work.nguyentruonganhkiet.api.model.enums.NotificationType;

import java.io.Serializable;
import java.sql.Timestamp;

@Getter
@Setter
@ToString
public class NotificationDto implements Serializable {
	private Long id;
	private Timestamp createdAt;
	private Timestamp updatedAt;
	private boolean isDelete;
	private NotificationType type;
	private FriendStatus friendStatus;
	private PostDto postRef;
	private StoryDto storyRef;
	private UserHaftDto userRef;
}
