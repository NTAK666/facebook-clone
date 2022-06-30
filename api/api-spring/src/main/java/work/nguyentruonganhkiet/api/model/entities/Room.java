package work.nguyentruonganhkiet.api.model.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Room extends BaseEntity {

	@Column(columnDefinition = "TEXT")
	public String name;

	@ManyToMany(fetch = FetchType.EAGER)
	@JsonBackReference
	@JoinTable(name = "room_users",
			joinColumns = @JoinColumn(name = "room_id"),
			inverseJoinColumns = @JoinColumn(name = "users_id"))
	private Set<User> users = new LinkedHashSet<>();

	@OneToMany(mappedBy = "room", orphanRemoval = true, fetch = FetchType.EAGER)
	@JsonManagedReference
	private Set<Message> messages = new LinkedHashSet<>();

}
