package work.nguyentruonganhkiet.api.model.observe;

import org.springframework.beans.factory.annotation.Autowired;
import work.nguyentruonganhkiet.api.model.entities.User;
import work.nguyentruonganhkiet.api.service.UserService;

import javax.persistence.PostPersist;
import java.util.UUID;

public class UserObserve {


    @PostPersist
    private void beforeCreateUser(User user) {
        String slug = UUID.randomUUID().toString();
        user.getUserInfo().setSlug(slug);
    }

    // generate uuid for user
    public UUID generateUUID(User user) {
        return UUID.randomUUID();
    }

}
