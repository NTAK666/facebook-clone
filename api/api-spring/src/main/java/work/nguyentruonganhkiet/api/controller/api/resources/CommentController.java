package work.nguyentruonganhkiet.api.controller.api.resources;


import io.swagger.v3.oas.annotations.Parameter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import work.nguyentruonganhkiet.api.model.dtos.requests.ReactRequestDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.CommentDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.MessageReturnDto;
import work.nguyentruonganhkiet.api.model.entities.Comment;
import work.nguyentruonganhkiet.api.model.entities.Notification;
import work.nguyentruonganhkiet.api.model.entities.User;
import work.nguyentruonganhkiet.api.model.sub.ReactComment;
import work.nguyentruonganhkiet.api.service.CommentService;
import work.nguyentruonganhkiet.api.service.NotificationService;
import work.nguyentruonganhkiet.api.service.UserService;
import work.nguyentruonganhkiet.api.utils.constant.STATUS;

import javax.validation.Valid;

import java.util.Objects;

import static work.nguyentruonganhkiet.api.utils.constant.API.*;

@RestController
@RequestMapping(API_ENDPOINTS_COMMENTS)
public class CommentController {

	private final NotificationService notificationService;
	private final CommentService commentService;
	private final UserService userService;
	private final ModelMapper modelMapper;

	@Autowired
	public CommentController( NotificationService notificationService , CommentService commentService , UserService userService , ModelMapper modelMapper ) {
		this.notificationService = notificationService;
		this.commentService = commentService;
		this.userService = userService;
		this.modelMapper = modelMapper;
	}

	@PostMapping(REACT_ID)
	public MessageReturnDto<CommentDto> reactComment( @PathVariable("id") Long id , @Valid @RequestBody ReactRequestDto react , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {

			User user = this.userService.findByEmail(userDetails.getUsername());

			Comment c = this.commentService.findById(id);

			ReactComment reactComment = ReactComment.builder().comment(c).reactType(react.getReactType()).build();

			Comment cr = this.commentService.reactToComment(c , reactComment);

			Notification notification = Notification.builder().commentRef(c).reactRef(reactComment).build();

			this.notificationService.reactCommentNotification(c , c.getUser() , user , notification);

			CommentDto commentDto = this.modelMapper.map(cr , CommentDto.class);

			return ResponseEntity.ok(MessageReturnDto.<CommentDto>builder().status(STATUS.HTTP_OK).message(STATUS.HTTP_OK_MESSAGE).data(commentDto).build()).getBody();
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@DeleteMapping(DELETE_ID)
	public MessageReturnDto<CommentDto> deleteComment( @PathVariable("id") Long id , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {
			User user = this.userService.findByEmail(userDetails.getUsername());

			Comment c = this.commentService.findById(id);

			if (! Objects.equals(c.getUser().getId() , user.getId()))
				return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();

			this.commentService.delete(c);

			CommentDto commentDto = this.modelMapper.map(c , CommentDto.class);

			return ResponseEntity.ok(MessageReturnDto.<CommentDto>builder().status(STATUS.HTTP_OK).message(STATUS.HTTP_OK_MESSAGE).data(commentDto).build()).getBody();

		} catch (Exception e) {
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

}
