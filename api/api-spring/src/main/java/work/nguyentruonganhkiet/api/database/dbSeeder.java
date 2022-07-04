package work.nguyentruonganhkiet.api.database;


import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import work.nguyentruonganhkiet.api.model.entities.*;
import work.nguyentruonganhkiet.api.model.enums.FriendStatus;
import work.nguyentruonganhkiet.api.model.enums.ReactType;
import work.nguyentruonganhkiet.api.model.sub.*;
import work.nguyentruonganhkiet.api.repositories.*;
import work.nguyentruonganhkiet.api.service.CommentService;

import java.util.HashSet;
import java.util.Set;

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

    @Autowired
    private FriendRepository friendRepository;


    // @EventListener(ApplicationReadyEvent.class)
    // public void seed() {
    //     this.userSeeder();
    //     this.friendSeeder();
    //     this.postSeeder();
    //     this.reactPostSeeder();
    //     this.commentPostSeeder();
    //     this.reactCommentPostSeeder();
    //     this.storySeeder();
    //     this.reactStorySeeder();
    //     this.commentStorySeeder();
    //     this.reactCommentStorySeeder();
    // }


    public void userSeeder() {
        if (this.userRepository.count() < 50L) {
            for (int i = 0; i < 50; i++) {
                User user = User.builder().email(faker.internet().emailAddress()).password(encoder.encode("password")).build();
                UserInfo userInfo = UserInfo.builder().firstName(faker.name().firstName()).lastName(faker.name().lastName()).phone(faker.phoneNumber().phoneNumber()).address(faker.address().fullAddress()).avatar("https://i.pravatar.cc/100").gender(faker.number().numberBetween(0, 1) == 1).build();
                user.setUserInfo(userInfo);
                this.userRepository.save(user);
            }
        }
    }

    public void postSeeder() {
        if (postRepository.count() < 50L) {
            for (int i = 0; i < 50; i++) {
                User user = this.userRepository.findById((long) faker.number().numberBetween(1, 50)).orElse(this.userRepository.findById(1L).orElse(null));
                Post post = Post.builder().body(faker.lorem().paragraph()).thumbnail("https://picsum.photos/" + faker.number().numberBetween(1000, 2000) + "/" + faker.number().numberBetween(800, 1200)).user(user).build();
                this.postRepository.save(post);
            }
        }
    }

    public void reactPostSeeder() {
        for (int i = 1; i < 50; i++) {
            Post post = this.postRepository.findById((long) i).orElse(null);
            assert post != null;
            for (int j = 1; j < 5; j++) {
                User user = this.userRepository.findById((long) faker.number().numberBetween(1, 50)).orElse(null);
                ReactPost reactPost = ReactPost.builder().reactType(ReactType.values()[faker.number().numberBetween(0, ReactType.values().length)]).user(user).post(post).build();
                this.reactRepository.save(reactPost);
            }
        }
    }

    public void commentPostSeeder() {
        for (int i = 1; i < 50; i++) {
            Post post = this.postRepository.findById((long) i).orElse(null);
            assert post != null;
            for (int j = 1; j < 5; j++) {
                User user = this.userRepository.findById((long) faker.number().numberBetween(1, 50)).orElse(null);
                CommentPost commentPost = CommentPost.builder().comment(faker.lorem().characters()).post(post).user(user).build();
                this.commentRepository.save(commentPost);
            }
        }
    }

    public void reactCommentPostSeeder() {
        for (int i = 1; i < 50; i++) {
            Comment comment = this.commentRepository.findById((long) i).orElse(null);
            for (int j = 1; j < 5; j++) {
                User user = this.userRepository.findById((long) faker.number().numberBetween(1, 50)).orElse(null);
                ReactComment reactComment = ReactComment.builder().reactType(ReactType.values()[faker.number().numberBetween(0, ReactType.values().length)]).user(user).comment(comment).build();
                this.reactRepository.save(reactComment);
            }
        }
    }

    public void storySeeder() {
        for (int i = 1; i < 50; i++) {
            User user = this.userRepository.findById((long) i).orElse(this.userRepository.findById(1L).orElse(null));
            Story story = Story.builder().user(user).title(faker.lorem().characters(100, 500)).image("https://picsum.photos/" + faker.number().numberBetween(1000, 2000) + "/" + faker.number().numberBetween(800, 1200)).build();
            this.storyRepository.save(story);
        }
    }

    public void reactStorySeeder() {
        for (int i = 1; i < 50; i++) {
            Story story = this.storyRepository.findById((long) i).orElse(null);
            for (int j = 1; j < 5; j++) {
                User user = this.userRepository.findById((long) faker.number().numberBetween(1, 50)).orElse(null);
                ReactStory reactStory = ReactStory.builder().reactType(ReactType.values()[faker.number().numberBetween(0, ReactType.values().length)]).user(user).story(story).build();
                this.reactRepository.save(reactStory);
            }
        }
    }

    public void commentStorySeeder() {
        for (int i = 1; i < 50; i++) {
            Story story = this.storyRepository.findById((long) i).orElse(null);
            for (int j = 1; j < 5; j++) {
                User user = this.userRepository.findById((long) faker.number().numberBetween(1, 50)).orElse(null);
                CommentStory commentStory = CommentStory.builder().comment(faker.lorem().characters()).story(story).user(user).build();
                this.commentRepository.save(commentStory);
            }
        }
    }

    public void reactCommentStorySeeder() {
        for (int i = 1; i < 50; i++) {
            Comment comment = this.commentRepository.findById((long) i).orElse(null);
            for (int j = 1; j < 5; j++) {
                User user = this.userRepository.findById((long) faker.number().numberBetween(1, 50)).orElse(null);
                ReactComment reactCommentStory = ReactComment.builder().reactType(ReactType.values()[faker.number().numberBetween(0, ReactType.values().length)]).user(user).comment(comment).build();
                this.reactRepository.save(reactCommentStory);
            }
        }
    }

    public void friendSeeder() {
        for (int i = 6; i < 50; i++) {
            Long randomId = (long) faker.number().numberBetween(1, 50);
            User user = this.userRepository.findById(randomId).orElse(this.userRepository.findById(1L).orElse(null));
            User userFriend1 = this.userRepository.findById(1L).orElse(null);
            User userFriend2 = this.userRepository.findById(2L).orElse(null);
            User userFriend3 = this.userRepository.findById(3L).orElse(null);
            User userFriend4 = this.userRepository.findById(4L).orElse(null);
            User userFriend5 = this.userRepository.findById(5L).orElse(null);

            Set<User> friends = new HashSet<>();
            friends.add(userFriend1);
            friends.add(userFriend2);
            friends.add(userFriend3);
            friends.add(userFriend4);
            friends.add(userFriend5);

            Friend friend1 = Friend.builder().users(friends).status(FriendStatus.ACCEPTED).build();
            assert user != null;
            user.getFriends().add(friend1);
            this.userRepository.save(user);
        }
    }


}
