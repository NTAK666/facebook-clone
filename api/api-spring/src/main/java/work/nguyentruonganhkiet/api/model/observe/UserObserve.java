package work.nguyentruonganhkiet.api.model.observe;

import org.springframework.beans.factory.annotation.Autowired;
import work.nguyentruonganhkiet.api.model.entities.User;
import work.nguyentruonganhkiet.api.repositories.UserRepository;

import javax.persistence.PostPersist;
import java.util.UUID;

public class UserObserve {

	@Autowired
	private UserRepository userRepository;

	@PostPersist
	private void beforeCreateUser( User user ) {
		String slug = UUID.randomUUID().toString();
		user.getUserInfo().setSlug(slug);
		userRepository.save(user);
	}

	// generate uuid for user
	public UUID generateUUID( User user ) {
		return UUID.randomUUID();
	}

}
