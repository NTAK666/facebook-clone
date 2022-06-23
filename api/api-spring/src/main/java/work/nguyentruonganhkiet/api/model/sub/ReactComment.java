package work.nguyentruonganhkiet.api.model.sub;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import work.nguyentruonganhkiet.api.model.entities.Comment;
import work.nguyentruonganhkiet.api.model.entities.React;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class ReactComment extends React {
	@ManyToOne
	@JoinColumn(name = "comment_id")
	private Comment comment;

}
