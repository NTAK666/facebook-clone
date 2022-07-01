package work.nguyentruonganhkiet.api.model.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Role extends BaseEntity {

	@Column(name = "name", nullable = false, unique = true,columnDefinition = "LONGTEXT")
	private String name;

	@ManyToMany(fetch = FetchType.EAGER)
	@JsonManagedReference
	@JoinTable(name = "role_permissions",
			joinColumns = @JoinColumn(name = "role_id"),
			inverseJoinColumns = @JoinColumn(name = "permissions_id"))
	private Set<Permission> permissions = new LinkedHashSet<>();

	@ManyToMany(fetch = FetchType.EAGER)
	@JsonManagedReference
	@JsonIgnore
	@JoinTable(name = "role_users",
			joinColumns = @JoinColumn(name = "role_id"),
			inverseJoinColumns = @JoinColumn(name = "users_id"))
	private Set<User> users = new LinkedHashSet<>();

}

