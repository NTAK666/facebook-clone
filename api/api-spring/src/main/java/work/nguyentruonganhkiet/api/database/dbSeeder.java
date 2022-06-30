package work.nguyentruonganhkiet.api.database;


import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import work.nguyentruonganhkiet.api.model.entities.*;
import work.nguyentruonganhkiet.api.model.enums.ReactType;
import work.nguyentruonganhkiet.api.model.sub.CommentPost;
import work.nguyentruonganhkiet.api.model.sub.ReactComment;
import work.nguyentruonganhkiet.api.model.sub.ReactPost;
import work.nguyentruonganhkiet.api.repositories.*;
import work.nguyentruonganhkiet.api.service.CommentService;

@Configuration
public class dbSeeder {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private ReactRepository reactRepository;

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private Faker faker;

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private StoryRepository storyRepository;


	@EventListener(ApplicationReadyEvent.class)
	public void seed() {
		this.userSeeder();
		this.postSeeder();
		this.reactPostSeeder();
		this.commentPostSeeder();
		this.reactCommentPostSeeder();
//		this.storySeeder();
	}


	public void userSeeder() {
		if (this.userRepository.count() < 50) {
			for (int i = 0 ; i < 50 ; i++) {
				User user = User.builder().email(faker.internet().emailAddress()).password(encoder.encode("password")).build();
				UserInfo userInfo = UserInfo.builder().firstName(faker.name().firstName()).lastName(faker.name().lastName()).phone(faker.phoneNumber().phoneNumber()).address(faker.address().fullAddress()).avatar("https://i.pravatar.cc/100").gender(faker.number().numberBetween(0 , 1) == 1).build();
				user.setUserInfo(userInfo);
				this.userRepository.save(user);
			}
		}
	}

	public void postSeeder() {
		if (postRepository.count() < 50) {
			for (int i = 0 ; i < 50 ; i++) {
				User user = this.userRepository.findById((long) faker.number().numberBetween(1 , 50)).orElse(null);
				Post post = Post.builder().body(faker.lorem().paragraph()).thumbnail("https://picsum.photos/" + faker.number().numberBetween(1000 , 2000) + "/" + faker.number().numberBetween(800 , 1200)).user(user).build();
				this.postRepository.save(post);
			}
		}
	}

	public void reactPostSeeder() {
		for (int i = 1 ; i < 50 ; i++) {
			Post post = this.postRepository.findById((long) i).orElse(null);
			assert post != null;
			for (int j = 1 ; j < 10 ; j++) {
				User user = this.userRepository.findById((long) faker.number().numberBetween(1 , 50)).orElse(null);
				ReactPost reactPost = ReactPost.builder()
						.reactType(ReactType.values()[faker.number().numberBetween(0 , ReactType.values().length)]).user(user).post(post).build();
				this.reactRepository.save(reactPost);
			}
		}
	}

	public void commentPostSeeder() {
		for (int i = 1 ; i < 50 ; i++) {
			Post post = this.postRepository.findById((long) i).orElse(null);
			assert post != null;
			for (int j = 1 ; j < 10 ; j++) {
				User user = this.userRepository.findById((long) faker.number().numberBetween(1 , 50)).orElse(null);
				CommentPost commentPost = CommentPost.builder().comment(faker.lorem().characters()).post(post).user(user).build();
				this.commentRepository.save(commentPost);
			}
		}
	}

	public void reactCommentPostSeeder() {
		for (int i = 1 ; i < 50 ; i++) {
			Comment comment = this.commentRepository.findById((long) i).orElse(null);
			for (int j = 1 ; j < 10 ; j++) {
				User user = this.userRepository.findById((long) faker.number().numberBetween(1 , 50)).orElse(null);
				ReactComment reactComment = ReactComment.builder()
						.reactType(ReactType.values()[faker.number().numberBetween(0 , ReactType.values().length)]).user(user).comment(comment).build();
				this.reactRepository.save(reactComment);
			}
		}
	}

	public void storySeeder() {
		for (int i = 1 ; i < 50 ; i++) {
			User user = this.userRepository.findById((long) i).orElse(null);
			Story story = Story.builder().user(user).title(faker.lorem().characters(100 , 500)).image("https://picsum.photos/" + faker.number().numberBetween(1000 , 2000) + "/" + faker.number().numberBetween(800 , 1200)).build();
			this.storyRepository.save(story);
		}
	}

}
