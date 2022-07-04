package work.nguyentruonganhkiet.api.controller.api.resources;


import io.swagger.v3.oas.annotations.Parameter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import work.nguyentruonganhkiet.api.model.dtos.requests.CommentPostRequestDto;
import work.nguyentruonganhkiet.api.model.dtos.requests.PostCreateDto;
import work.nguyentruonganhkiet.api.model.dtos.requests.ReactRequestDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.MessageReturnDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.entities.CommentDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.entities.PostDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.entities.ReactDto;
import work.nguyentruonganhkiet.api.model.entities.Friend;
import work.nguyentruonganhkiet.api.model.entities.Notification;
import work.nguyentruonganhkiet.api.model.entities.Post;
import work.nguyentruonganhkiet.api.model.entities.User;
import work.nguyentruonganhkiet.api.model.enums.FriendStatus;
import work.nguyentruonganhkiet.api.model.sub.CommentPost;
import work.nguyentruonganhkiet.api.model.sub.ReactPost;
import work.nguyentruonganhkiet.api.repositories.ReactRepository;
import work.nguyentruonganhkiet.api.service.CommentService;
import work.nguyentruonganhkiet.api.service.NotificationService;
import work.nguyentruonganhkiet.api.service.PostService;
import work.nguyentruonganhkiet.api.service.UserService;
import work.nguyentruonganhkiet.api.utils.constant.STATUS;
import work.nguyentruonganhkiet.api.utils.files.SaveFile;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import static work.nguyentruonganhkiet.api.utils.constant.API.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(API_ENDPOINTS_POSTS)
public class PostController {

	private final UserService userService;
	private final PostService postService;
	private final ModelMapper modelMapper;
	private final NotificationService notificationService;
	private final SaveFile saveFile;
	private final CommentService commentService;
	private final ReactRepository reactRepository;

	@Autowired
	public PostController( UserService userService , PostService postService , ModelMapper modelMapper , NotificationService notificationService , SaveFile saveFile , CommentService commentService , ReactRepository reactRepository ) {
		this.userService = userService;
		this.postService = postService;
		this.modelMapper = modelMapper;
		this.notificationService = notificationService;
		this.saveFile = saveFile;
		this.commentService = commentService;
		this.reactRepository = reactRepository;
	}

	@GetMapping(FRIENDS)
	public MessageReturnDto<List<PostDto>> getAllPostsOfFriends( @RequestParam(name = "page", defaultValue = "0") int page , @RequestParam(name = "size", defaultValue = "10") int size , @RequestParam(name = "sortBy", defaultValue = "createdAt") String sortBy , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {

			Pageable pageable = PageRequest.of(page , size , Sort.by(sortBy));

			User user = userService.findByEmail(userDetails.getUsername());

			List<Friend> friends = user.getFriends().stream().filter(f -> f.getStatus().equals(FriendStatus.ACCEPTED)).toList();

			List<User> users = friends.stream().map(Friend::getUsers).flatMap(Set::stream).filter(Objects::nonNull).distinct().toList();

			List<Post> posts = users.stream().map(User::getPosts).flatMap(Set::stream).filter(Objects::nonNull).toList();

			posts.forEach(post -> {
				Set<CommentPost> commentPosts = post.getCommentPosts().stream().sorted(( a , b ) -> b.getCreatedAt().compareTo(a.getCreatedAt())).limit(5).collect(Collectors.toSet());
				post.setCommentPosts(commentPosts);
			});

			List<PostDto> postDtos = posts.stream().map(post -> modelMapper.map(post , PostDto.class)).toList();

			Page<PostDto> pagePosts = new PageImpl<>(postDtos , pageable , posts.size());

			return ResponseEntity.ok(MessageReturnDto.<List<PostDto>>builder().data(pagePosts.getContent()).message(STATUS.HTTP_OK_MESSAGE).status(STATUS.HTTP_OK).paginate(pageable).build()).getBody();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}

	}

	@GetMapping(ALL)
	public MessageReturnDto<List<PostDto>> getAllPostsOfUser( @RequestParam(name = "page", defaultValue = "0") int page , @RequestParam(name = "size", defaultValue = "10") int size , @RequestParam(name = "sortBy", defaultValue = "createdAt") String sortBy , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {

			Pageable pageable = PageRequest.of(page , size , Sort.by(sortBy));

			User user = userService.findByEmail(userDetails.getUsername());

			List<Post> posts = this.postService.findAllByUserId(user.getId() , pageable);

			posts.forEach(post -> {
				Set<CommentPost> commentPosts = post.getCommentPosts().stream().sorted(( a , b ) -> b.getCreatedAt().compareTo(a.getCreatedAt())).limit(5).collect(Collectors.toSet());
				post.setCommentPosts(commentPosts);
			});

			if (posts.isEmpty())
				return MessageReturnDto.<List<PostDto>>builder().data(null).message(STATUS.HTTP_OK_MESSAGE).status(STATUS.HTTP_OK).build();

			List<PostDto> postDtos = posts.stream().map(post -> modelMapper.map(post , PostDto.class)).toList();

			return ResponseEntity.ok(MessageReturnDto.<List<PostDto>>builder().data(postDtos).message(STATUS.HTTP_OK_MESSAGE).status(STATUS.HTTP_OK).paginate(pageable).build()).getBody();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}

	}

	@PostMapping(CREATE)
	public MessageReturnDto<PostDto> createPost( @Valid @RequestBody PostCreateDto post , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {

			User user = userService.findByEmail(userDetails.getUsername());

			Post p = this.postService.save(Post.builder().body(post.getBody()).thumbnail(post.getThumbnail()).user(user).body(post.getBody()).build());

			PostDto pr = modelMapper.map(p , PostDto.class);

			return ResponseEntity.ok(MessageReturnDto.<PostDto>builder().status(STATUS.HTTP_OK).message(STATUS.HTTP_OK_MESSAGE).data(pr).build()).getBody();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@GetMapping(GET_ID)
	public MessageReturnDto<PostDto> getPostById( @PathVariable("id") Long id , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {

			User user = userService.findByEmail(userDetails.getUsername());

			Post post = this.postService.findById(id);

			if (Objects.isNull(post))
				return MessageReturnDto.<PostDto>builder().status(STATUS.HTTP_NOT_FOUND).message(STATUS.HTTP_NOT_FOUND_MESSAGE).data(null).build();

			PostDto pr = modelMapper.map(post , PostDto.class);

			return ResponseEntity.ok(MessageReturnDto.<PostDto>builder().status(STATUS.HTTP_OK).message(STATUS.HTTP_OK_MESSAGE).data(pr).build()).getBody();

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@PutMapping(UPDATE_ID)
	public MessageReturnDto<PostDto> updatePost( @PathVariable("id") Long id , @Valid @RequestBody PostCreateDto post , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {

			User user = userService.findByEmail(userDetails.getUsername());

			Post p = this.postService.findById(id);

			if (! Objects.equals(p.getUser().getId() , user.getId()))
				return MessageReturnDto.<PostDto>builder().status(STATUS.HTTP_UNAUTHORIZED).message(STATUS.HTTP_UNAUTHORIZED_MESSAGE).build();

			if (post.getThumbnail() != null) {
				String path = saveFile.save(post.getThumbnail() , "" , "");
				p.setThumbnail(path);
			}
			if (post.getBody() != null) p.setBody(post.getBody());

			p = this.postService.update(p , id);

			PostDto pr = modelMapper.map(p , PostDto.class);

			return ResponseEntity.ok(MessageReturnDto.<PostDto>builder().data(pr).message(STATUS.HTTP_OK_MESSAGE).status(STATUS.HTTP_OK).build()).getBody();

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@DeleteMapping(DELETE_ID)
	public MessageReturnDto<PostDto> deletePost( @PathVariable("id") Long id , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {

			User user = userService.findByEmail(userDetails.getUsername());

			Post p = this.postService.findById(id);

			if (! Objects.equals(p.getUser().getId() , user.getId()))
				return MessageReturnDto.<PostDto>builder().status(STATUS.HTTP_UNAUTHORIZED).message(STATUS.HTTP_UNAUTHORIZED_MESSAGE).build();

			this.postService.delete(p);

			PostDto pr = modelMapper.map(p , PostDto.class);

			return ResponseEntity.ok(MessageReturnDto.<PostDto>builder().status(STATUS.HTTP_OK).message(STATUS.HTTP_OK_MESSAGE).data(pr).build()).getBody();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@PostMapping(REACT_ID)
	public MessageReturnDto<ReactDto> reactPost( @PathVariable("id") Long id , @Valid @RequestBody ReactRequestDto react , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {

			User user = userService.findByEmail(userDetails.getUsername());

			Post p = this.postService.findById(id);

			ReactPost reactPost = ReactPost.builder().user(user).reactType(react.getReactType()).post(p).build();

			this.reactRepository.save(reactPost);

			Notification notification = Notification.builder().postRef(p).reactRef(reactPost).build();

			this.notificationService.reactPostNotification(p , p.getUser() , user , notification);

			ReactDto r = modelMapper.map(reactPost , ReactDto.class);

			return ResponseEntity.ok(MessageReturnDto.<ReactDto>builder().status(STATUS.HTTP_OK).message(STATUS.HTTP_OK_MESSAGE).data(r).build()).getBody();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}

	}

	@PostMapping(COMMENT_ID)
	public MessageReturnDto<CommentDto> commentPost( @PathVariable("id") Long id , @Valid @RequestBody CommentPostRequestDto comment , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {

			User user = userService.findByEmail(userDetails.getUsername());

			Post p = this.postService.findById(id);

			CommentPost commentPost = CommentPost.builder().comment(comment.getComment()).user(user).post(p).build();

			this.commentService.save(commentPost);

			Notification notification = Notification.builder().postRef(p).commentRef(commentPost).build();

			this.notificationService.commentPostNotification(p , p.getUser() , user , notification);

			CommentDto commentDto = modelMapper.map(commentPost , CommentDto.class);

			return ResponseEntity.ok(MessageReturnDto.<CommentDto>builder().status(STATUS.HTTP_OK).message(STATUS.HTTP_OK_MESSAGE).data(commentDto).build()).getBody();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

}
