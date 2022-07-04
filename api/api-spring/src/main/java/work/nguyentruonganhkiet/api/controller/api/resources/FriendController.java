package work.nguyentruonganhkiet.api.controller.api.resources;


import io.swagger.v3.oas.annotations.Parameter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import work.nguyentruonganhkiet.api.model.dtos.responses.MessageReturnDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.entities.FriendDto;
import work.nguyentruonganhkiet.api.model.entities.User;
import work.nguyentruonganhkiet.api.repositories.UserRepository;
import work.nguyentruonganhkiet.api.utils.constant.STATUS;

import java.util.List;

import static work.nguyentruonganhkiet.api.utils.constant.API.ALL;
import static work.nguyentruonganhkiet.api.utils.constant.API.API_ENDPOINTS_FRIENDS;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(API_ENDPOINTS_FRIENDS)
public class FriendController {

	private final UserRepository userRepository;

	private final ModelMapper modelMapper;


	@Autowired
	public FriendController( UserRepository userRepository , ModelMapper modelMapper ) {
		this.userRepository = userRepository;
		this.modelMapper = modelMapper;
	}

	@GetMapping(ALL)
	public MessageReturnDto<?> getAllFriend( @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {
			User user = this.userRepository.findByEmail(userDetails.getUsername()).orElse(null);

			List<FriendDto> friendDtos = user.getFriends().stream().map(friend -> modelMapper.map(friend , FriendDto.class)).toList();

			return ResponseEntity.ok(MessageReturnDto.<List<FriendDto>>builder().message(STATUS.HTTP_OK_MESSAGE).status(STATUS.HTTP_OK).data(friendDtos).build()).getBody();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}
}
