package work.nguyentruonganhkiet.api.controller.api;


import io.swagger.v3.oas.annotations.Parameter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import work.nguyentruonganhkiet.api.model.dtos.CustomUserDetails;
import work.nguyentruonganhkiet.api.model.dtos.requests.LoginDto;
import work.nguyentruonganhkiet.api.model.dtos.requests.RegisterDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.JwtDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.MessageReturnDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.entities.UserHaftDto;
import work.nguyentruonganhkiet.api.model.entities.Role;
import work.nguyentruonganhkiet.api.model.entities.User;
import work.nguyentruonganhkiet.api.model.entities.UserInfo;
import work.nguyentruonganhkiet.api.repositories.RoleRepository;
import work.nguyentruonganhkiet.api.repositories.UserInfoRepository;
import work.nguyentruonganhkiet.api.repositories.UserRepository;
import work.nguyentruonganhkiet.api.service.UserService;
import work.nguyentruonganhkiet.api.utils.JwtUtils;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;

import static work.nguyentruonganhkiet.api.model.enums.RoleEnum.ROLE_USER;
import static work.nguyentruonganhkiet.api.utils.constant.API.*;
import static work.nguyentruonganhkiet.api.utils.constant.STATUS.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(API_ENDPOINTS_AUTH)
public class AuthController {
    final AuthenticationManager authenticationManager;

    final UserRepository userRepository;

    final UserInfoRepository userInfoRepository;

    final RoleRepository roleRepository;

    final PasswordEncoder encoder;

    final JwtUtils jwtUtils;

    final ModelMapper modelMapper;

    private final UserService userService;


    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder encoder, JwtUtils jwtUtils, UserInfoRepository userInfoRepository, ModelMapper modelMapper, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.userInfoRepository = userInfoRepository;
        this.modelMapper = modelMapper;
        this.userService = userService;
    }

    @PostMapping(API_ENDPOINTS_AUTH_LOGIN)
    public MessageReturnDto<?> login(@Valid @RequestBody LoginDto loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            String jwt = jwtUtils.generateJwtToken(userDetails);

            return ResponseEntity.ok(MessageReturnDto.<JwtDto>builder().status(HTTP_OK).message(HTTP_OK_MESSAGE).data(JwtDto.builder().expiresIn(8640000).token(jwt).build()).build()).getBody();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
        }
    }

    @PostMapping(API_ENDPOINTS_AUTH_REGISTER)
    public MessageReturnDto<?> register(@Valid @RequestBody RegisterDto signUpRequest) {
        try {
            if (userRepository.existsByEmail(signUpRequest.getEmail())) {
                return ResponseEntity.badRequest().body(MessageReturnDto.getCustomOKMessage("Email ready exist ! Please choose new one")).getBody();
            }

            User user = User.builder().email(signUpRequest.getEmail()).password(encoder.encode(signUpRequest.getPassword())).build();

            Role userRole = roleRepository.findByName(ROLE_USER).orElseGet(() -> roleRepository.save(Role.builder().name(ROLE_USER).build()));

            user.setRoles(new HashSet<>(List.of(userRole)));

            UserInfo userInfo = UserInfo.builder().lastName(signUpRequest.getLastName()).firstName(signUpRequest.getFirstName()).gender(signUpRequest.isGender()).birthday(signUpRequest.getBirthday()).build();

            user.setUserInfo(userInfo);

            this.userService.save(user);

            return ResponseEntity.ok(MessageReturnDto.getOkReturn()).getBody();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
        }
    }

    @GetMapping(API_ENDPOINTS_AUTH_ME)
    public MessageReturnDto<?> getUserInfo(@Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails) {
        try {
            User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));

            UserHaftDto userDto = modelMapper.map(user, UserHaftDto.class);

            return ResponseEntity.ok(MessageReturnDto.<UserHaftDto>builder().status(HTTP_OK).message(HTTP_OK_MESSAGE).data(userDto).build()).getBody();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
        }
    }

}
