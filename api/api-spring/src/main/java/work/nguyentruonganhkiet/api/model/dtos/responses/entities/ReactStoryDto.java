package work.nguyentruonganhkiet.api.model.dtos.responses.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import work.nguyentruonganhkiet.api.model.dtos.responses.entities.UserHaftDto;
import work.nguyentruonganhkiet.api.model.enums.ReactType;

import java.io.Serializable;
import java.sql.Timestamp;

@Getter
@Setter
@ToString
public class ReactStoryDto implements Serializable {
	private Long id;
	private Timestamp createdAt;
	private Timestamp updatedAt;
	private boolean isDelete;
	private ReactType reactType;
	private int reactCount;
	private UserHaftDto user;
}
