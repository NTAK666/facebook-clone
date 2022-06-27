package work.nguyentruonganhkiet.api.model.observe;


import work.nguyentruonganhkiet.api.model.entities.Friend;

import javax.persistence.PostPersist;

public class FriendObserve {
	@PostPersist
	private void beforeInsertFriend( Friend friend ) {


	}
}
