package work.nguyentruonganhkiet.api.model.dtos.responses.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@ToString
public class UserDto implements Serializable {
	private Long id;
	private Timestamp createdAt;
	private Timestamp updatedAt;
	private String email;
	private UserInfoDto userInfo;
	private Set<StoryDto> stories = new LinkedHashSet<>();
	private Set<RoleDto> roles = new LinkedHashSet<>();
	private Set<PostDto> posts = new LinkedHashSet<>();
	private Set<NotificationDto> notifications = new LinkedHashSet<>();
}
