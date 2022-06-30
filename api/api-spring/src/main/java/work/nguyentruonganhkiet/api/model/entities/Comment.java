package work.nguyentruonganhkiet.api.model.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;
import work.nguyentruonganhkiet.api.model.sub.ReactComment;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Comment extends BaseEntity {

	@NotNull
	@Column(columnDefinition = "TEXT")
	public String comment;

	@OneToMany(mappedBy = "comment", orphanRemoval = true, fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JsonManagedReference
	private Set<ReactComment> reactComments = new LinkedHashSet<>();

	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "user_id")
	private User user;

}
