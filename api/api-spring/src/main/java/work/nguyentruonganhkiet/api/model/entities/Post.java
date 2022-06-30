package work.nguyentruonganhkiet.api.model.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;
import work.nguyentruonganhkiet.api.model.observe.PostObserve;
import work.nguyentruonganhkiet.api.model.sub.CommentPost;
import work.nguyentruonganhkiet.api.model.sub.ReactPost;

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
@DiscriminatorValue("POST")
@EntityListeners(PostObserve.class)
public class Post extends BaseEntity {

	@Column(columnDefinition = "TEXT")
	private String slug;
	@Column(columnDefinition = "TEXT")
	private String thumbnail;
	@Column(columnDefinition = "TEXT")
	@NotNull
	private String body;
	@Column(columnDefinition = "int default 0")
	private long views = 0;

	@OneToMany(mappedBy = "post", orphanRemoval = true, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JsonManagedReference
	private Set<ReactPost> reactPosts = new LinkedHashSet<>();

	@OneToMany(mappedBy = "post", orphanRemoval = true, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JsonManagedReference
	private Set<CommentPost> commentPosts = new LinkedHashSet<>();

	@ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JsonBackReference
	@JoinColumn(name = "user_id")
	private User user;

}
