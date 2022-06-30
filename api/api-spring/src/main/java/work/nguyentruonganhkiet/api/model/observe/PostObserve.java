package work.nguyentruonganhkiet.api.model.observe;


import work.nguyentruonganhkiet.api.model.entities.Post;

import javax.persistence.PostPersist;
import javax.persistence.PreUpdate;
import java.util.UUID;

public class PostObserve {


    @PostPersist
    private void beforeUpdatePost(Post post) {
        post.setSlug(UUID.randomUUID().toString());
    }

}
