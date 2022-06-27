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
public class PostDto implements Serializable {
	private Long id;
	private Timestamp createdAt;
	private Timestamp updatedAt;
	private boolean isDelete;
	private String title;
	private String slug;
	private String thumbnail;
	private String description;
	private String body;
	private String views;
	private String cover;
	private UserHaftDto user;
	private Set<ReactPostDto> reactPosts = new LinkedHashSet<>();
	private Set<CommentPostDto> commentPosts = new LinkedHashSet<>();
}
