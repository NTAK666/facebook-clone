package work.nguyentruonganhkiet.api.model.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;
import work.nguyentruonganhkiet.api.model.enums.FriendStatus;
import work.nguyentruonganhkiet.api.model.observe.FriendObserve;

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
@EntityListeners(FriendObserve.class)
public class Friend extends BaseEntity {

	@NotNull
	public FriendStatus status = FriendStatus.PENDING;

	@ManyToMany(cascade = { CascadeType.PERSIST , CascadeType.REFRESH , CascadeType.DETACH })
	@JoinTable(name = "friend_users",
			joinColumns = @JoinColumn(name = "friend_id"),
			inverseJoinColumns = @JoinColumn(name = "users_id"))
	private Set<User> users = new LinkedHashSet<>();

//	@NotNull
//	@ManyToOne(cascade = { CascadeType.PERSIST , CascadeType.DETACH , CascadeType.REFRESH , CascadeType.REMOVE }, optional = false, fetch = FetchType.EAGER)
//	@JsonBackReference
//	@JoinColumn(name = "user_id", nullable = false)
//	private User user;


}
