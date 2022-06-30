package work.nguyentruonganhkiet.api.model.observe;

import work.nguyentruonganhkiet.api.model.entities.User;

import javax.persistence.PostPersist;
import java.util.UUID;

public class UserObserve {


    @PostPersist
    private void beforeCreateUser(User user) {
        user.getUserInfo().setSlug(UUID.randomUUID().toString());
    }

}
