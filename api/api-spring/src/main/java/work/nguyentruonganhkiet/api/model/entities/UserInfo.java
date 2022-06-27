package work.nguyentruonganhkiet.api.model.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class UserInfo extends BaseEntity {

	@NotNull
	private String firstName;
	@NotNull
	private String lastName;
	private String phone;
	private String address;
	private String avatar;
	private String coverImage;
	private String about;
	private String bio;
	private String slug;
	private Date birthday;
	private boolean gender;

	@OneToOne(mappedBy = "userInfo", orphanRemoval = true, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JsonIgnore
	private User users;

}
