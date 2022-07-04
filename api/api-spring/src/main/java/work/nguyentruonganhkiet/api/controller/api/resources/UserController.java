package work.nguyentruonganhkiet.api.controller.api.resources;


import io.swagger.v3.oas.annotations.Parameter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import work.nguyentruonganhkiet.api.model.dtos.requests.AddFriendRequestDto;
import work.nguyentruonganhkiet.api.model.dtos.requests.ChangeFriendStatusDto;
import work.nguyentruonganhkiet.api.model.dtos.requests.UpdateUserRequestDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.MessageReturnDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.entities.FriendDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.entities.UserHaftDto;
import work.nguyentruonganhkiet.api.model.entities.Friend;
import work.nguyentruonganhkiet.api.model.entities.Notification;
import work.nguyentruonganhkiet.api.model.entities.Post;
import work.nguyentruonganhkiet.api.model.entities.User;
import work.nguyentruonganhkiet.api.model.enums.FriendStatus;
import work.nguyentruonganhkiet.api.model.enums.NotificationType;
import work.nguyentruonganhkiet.api.service.NotificationService;
import work.nguyentruonganhkiet.api.service.PostService;
import work.nguyentruonganhkiet.api.service.RoomService;
import work.nguyentruonganhkiet.api.service.UserService;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static work.nguyentruonganhkiet.api.utils.constant.API.*;
import static work.nguyentruonganhkiet.api.utils.constant.STATUS.HTTP_OK;
import static work.nguyentruonganhkiet.api.utils.constant.STATUS.HTTP_OK_MESSAGE;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(API_ENDPOINTS_USERS)
public class UserController {

	private final UserService userService;
	private final PostService postService;
	private final NotificationService notificationService;
	private final ModelMapper modelMapper;
	private final RoomService roomService;

	@Autowired
	public UserController( UserService userService , PostService postService , NotificationService notificationService , ModelMapper modelMapper , RoomService roomService ) {
		this.userService = userService;
		this.postService = postService;
		this.notificationService = notificationService;
		this.modelMapper = modelMapper;
		this.roomService = roomService;
	}

	@GetMapping(GET_ID)
	public MessageReturnDto<?> getUser( @PathVariable("id") Long id , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {

			User user = userService.findByEmail(userDetails.getUsername());

			User u = userService.findById(id);

			UserHaftDto userHaftDto = modelMapper.map(u , UserHaftDto.class);

			return ResponseEntity.ok(MessageReturnDto.<UserHaftDto>builder().status(HTTP_OK).message(HTTP_OK_MESSAGE).data(userHaftDto).build()).getBody();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@GetMapping(GET_FRIENDS)
	public MessageReturnDto getAllFriends( @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {

			User user = userService.findByEmail(userDetails.getUsername());

			List<Friend> fs = user.getFriends().stream().filter(f -> f.getStatus().equals(FriendStatus.ACCEPTED)).toList();

			List<FriendDto> userHaftDtos = fs.stream().map(f -> this.modelMapper.map(f , FriendDto.class)).toList();

			return ResponseEntity.ok(MessageReturnDto.<List<FriendDto>>builder().message(HTTP_OK_MESSAGE).status(HTTP_OK).data(userHaftDtos).build()).getBody();

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}

	}

	@PutMapping(SETTINGS_UPDATE)
	public MessageReturnDto<?> updateProfile( @Valid @RequestBody UpdateUserRequestDto updateUserRequestDto , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {
			User user = userService.findByEmail(userDetails.getUsername());

			if (updateUserRequestDto.getFirstName() != null)
				user.getUserInfo().setFirstName(updateUserRequestDto.getFirstName());
			if (updateUserRequestDto.getLastName() != null)
				user.getUserInfo().setLastName(updateUserRequestDto.getLastName());
			if (updateUserRequestDto.getPhone() != null) user.getUserInfo().setPhone(updateUserRequestDto.getPhone());
			if (updateUserRequestDto.getAddress() != null)
				user.getUserInfo().setAddress(updateUserRequestDto.getAddress());
			if (updateUserRequestDto.getAvatar() != null)
				user.getUserInfo().setAvatar(updateUserRequestDto.getAvatar());
			if (updateUserRequestDto.getCoverImage() != null)
				user.getUserInfo().setCoverImage(updateUserRequestDto.getCoverImage());
			if (updateUserRequestDto.getAbout() != null) user.getUserInfo().setAbout(updateUserRequestDto.getAbout());
			if (updateUserRequestDto.getBio() != null) user.getUserInfo().setBio(updateUserRequestDto.getBio());
			if (updateUserRequestDto.getSlug() != null) user.getUserInfo().setSlug(updateUserRequestDto.getSlug());
			if (updateUserRequestDto.getBirthday() != null)
				user.getUserInfo().setBirthday(updateUserRequestDto.getBirthday());
			if (updateUserRequestDto.getGender() != ( - 1 ))
				user.getUserInfo().setGender(updateUserRequestDto.getGender() != 0);

			this.userService.save(user);

			UserHaftDto userHaftDto = modelMapper.map(user , UserHaftDto.class);

			return ResponseEntity.status(HTTP_OK).body(MessageReturnDto.<UserHaftDto>builder().status(HTTP_OK).message(HTTP_OK_MESSAGE).data(userHaftDto).build()).getBody();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}

	}

	@PostMapping(UTILS_ADD_FRIEND)
	public MessageReturnDto<?> addFriend( @Valid @RequestBody AddFriendRequestDto addFriendRequestDto , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {

			User user = userService.findByEmail(userDetails.getUsername());

			User friend = userService.findByEmail(addFriendRequestDto.getEmail());

			Set<User> friends = new HashSet<>();
			friends.add(friend);

			Friend fu = Friend.builder().users(friends).status(FriendStatus.PENDING).build();

			user.getFriends().add(fu);

			userService.save(user);

			Notification notification = Notification.builder().owner(user).userRef(friend).type(NotificationType.ADD_FRIEND).build();

			notificationService.save(notification);

			UserHaftDto userHaftDto = modelMapper.map(user , UserHaftDto.class);

			return ResponseEntity.status(HTTP_OK).body(MessageReturnDto.<UserHaftDto>builder().status(HTTP_OK).message(HTTP_OK_MESSAGE).data(userHaftDto).build()).getBody();

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@PutMapping(UTILS_CHANGE_STATUS_FRIEND)
	public MessageReturnDto changeStatusFriend( @Valid @RequestBody ChangeFriendStatusDto changeFriendStatusDto , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {

			User user = userService.findByEmail(userDetails.getUsername());

			User friend = userService.findByEmail(changeFriendStatusDto.getEmailTarget());

			this.userService.processFriendStatus(user , friend , changeFriendStatusDto.getStatus());

			Notification notification = Notification.builder().owner(user).userRef(friend).type(NotificationType.ADD_FRIEND).build();

			notificationService.save(notification);

			return ResponseEntity.status(HTTP_OK).body(MessageReturnDto.builder().status(HTTP_OK).message(HTTP_OK_MESSAGE).build()).getBody();

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@GetMapping(GET_IMAGE_OF_USER)
	public MessageReturnDto getImagesUser( @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {

			User user = userService.findByEmail(userDetails.getUsername());

			List<String> images = user.getPosts().stream().map(Post::getThumbnail).toList();

			return ResponseEntity.status(HTTP_OK).body(MessageReturnDto.<List<String>>builder().status(HTTP_OK).message(HTTP_OK_MESSAGE).data(images).build()).getBody();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@PutMapping(LOCK_ACCOUNT)
	public MessageReturnDto lockAccount( @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {

			User user = userService.findByEmail(userDetails.getUsername());

			this.userService.delete(user);

			return ResponseEntity.status(HTTP_OK).body(MessageReturnDto.<UserHaftDto>builder().status(HTTP_OK).message(HTTP_OK_MESSAGE).build()).getBody();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@GetMapping("find-by-name")
	public MessageReturnDto findUserByName( @RequestParam(name = "name", defaultValue = "") String name , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {
			List<User> users = this.userService.getUsersByLastName(name);

			List<UserHaftDto> usersHaftDtos = users.stream().map(user -> modelMapper.map(user , UserHaftDto.class)).toList();

			return ResponseEntity.status(HTTP_OK).body(MessageReturnDto.<List<UserHaftDto>>builder().data(usersHaftDtos).status(HTTP_OK).message(HTTP_OK_MESSAGE).build()).getBody();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

}
