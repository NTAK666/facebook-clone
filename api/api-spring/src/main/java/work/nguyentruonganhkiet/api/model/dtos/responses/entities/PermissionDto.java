package work.nguyentruonganhkiet.api.model.dtos.responses.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.sql.Timestamp;

@Getter
@Setter
@ToString
public class PermissionDto implements Serializable {
	private Long id;
	private Timestamp createdAt;
	private Timestamp updatedAt;
	private boolean isDelete;
	private String name;
}
