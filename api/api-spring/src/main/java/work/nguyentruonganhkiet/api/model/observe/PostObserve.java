package work.nguyentruonganhkiet.api.model.observe;


import work.nguyentruonganhkiet.api.model.entities.Post;

import javax.persistence.PreUpdate;

public class PostObserve {


	@PreUpdate
	private void beforeUpdatePost( Post post ) {
		// check current user own post
		// if not, throw exception



	}

}
