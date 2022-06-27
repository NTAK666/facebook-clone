package work.nguyentruonganhkiet.api.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.nguyentruonganhkiet.api.model.entities.Story;
import work.nguyentruonganhkiet.api.model.sub.CommentStory;
import work.nguyentruonganhkiet.api.model.sub.ReactStory;
import work.nguyentruonganhkiet.api.repositories.StoryRepository;
import work.nguyentruonganhkiet.api.utils.files.SaveFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StoryService implements IBaseService<Story, Long> {

	private final StoryRepository storyRepository;
	private final SaveFile saveFile;

	@Autowired
	public StoryService( StoryRepository storyRepository , SaveFile saveFile ) {
		this.storyRepository = storyRepository;
		this.saveFile = saveFile;
	}

	@Override
	public Story findById( Long id ) {
		return this.storyRepository.findById(id).orElse(null).isDelete() ? null : this.storyRepository.findById(id).orElse(null);
	}

	@Override
	public Story save( Story entity ) {
		if (entity.getImage() != null) {
			try {
				String path = saveFile.save(entity.getImage() , "" , "");
				entity.setImage(path);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return this.storyRepository.save(entity);
	}

	@Override
	public Story update( Story entity , Long id ) {
		return this.storyRepository.save(entity);
	}

	@Override
	public Story delete( Story entity ) {
		entity.setDelete(true);
		return this.storyRepository.save(entity);
	}

	@Override
	public List<Story> findAll() {
		return this.storyRepository.findAll().stream().filter(story -> ! story.isDelete()).collect(Collectors.toList());
	}

	public Story reactToStory( Story story , ReactStory reactStory ) {
		story.getReactStories().add(reactStory);
		return this.storyRepository.save(story);
	}

	public Story commentToStory( Story story , CommentStory commentStory ) {
		story.getCommentStories().add(commentStory);
		return this.storyRepository.save(story);
	}
}
