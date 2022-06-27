package work.nguyentruonganhkiet.api.model.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;
import work.nguyentruonganhkiet.api.model.enums.ReactType;
import work.nguyentruonganhkiet.api.model.observe.ReactObserve;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SuperBuilder
@EntityListeners(ReactObserve.class)
public abstract class React extends BaseEntity {

	private int views = 0;

	@Column(name = "react_type", nullable = false)
	private ReactType reactType;

	@Column(name = "react_count", nullable = false, columnDefinition = "int default 0")
	private int reactCount;

	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JsonBackReference
	@JoinColumn(name = "user_id")
	private User user;

}
