package work.nguyentruonganhkiet.api.model.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;
import work.nguyentruonganhkiet.api.model.observe.StoryObserve;
import work.nguyentruonganhkiet.api.model.sub.CommentStory;
import work.nguyentruonganhkiet.api.model.sub.ReactStory;

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
@EntityListeners(StoryObserve.class)
public class Story extends BaseEntity {

	@NotNull
	private String title;
	@NotNull
	private String image;
	@NotNull
	private String slug;

	@OneToMany(mappedBy = "story", orphanRemoval = true, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JsonManagedReference
	private Set<ReactStory> reactStories = new LinkedHashSet<>();

	@OneToMany(mappedBy = "story", orphanRemoval = true, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JsonManagedReference
	private Set<CommentStory> commentStories = new LinkedHashSet<>();

	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "user_id")
	private User user;

}
