package work.nguyentruonganhkiet.api.model.dtos.responses.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import work.nguyentruonganhkiet.api.model.dtos.responses.entities.ReactCommentDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.entities.UserHaftDto;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@ToString
public class CommentPostDto implements Serializable {
	private Long id;
	private Timestamp createdAt;
	private Timestamp updatedAt;
	private boolean isDelete;
	private String comment;
	private Set<ReactCommentDto> reactComments = new LinkedHashSet<>();
	private UserHaftDto user;
}
