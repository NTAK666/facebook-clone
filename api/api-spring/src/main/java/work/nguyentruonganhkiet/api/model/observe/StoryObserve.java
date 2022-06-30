package work.nguyentruonganhkiet.api.model.observe;

import work.nguyentruonganhkiet.api.model.entities.Story;

import javax.persistence.PostPersist;
import java.util.UUID;

public class StoryObserve {

    @PostPersist
    private void beforeCreateStory(Story story) {
        story.setSlug(UUID.randomUUID().toString());
    }

}
