package work.nguyentruonganhkiet.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import work.nguyentruonganhkiet.api.model.dtos.CustomUserDetails;
import work.nguyentruonganhkiet.api.model.entities.Friend;
import work.nguyentruonganhkiet.api.model.entities.Role;
import work.nguyentruonganhkiet.api.model.entities.Room;
import work.nguyentruonganhkiet.api.model.entities.User;
import work.nguyentruonganhkiet.api.model.enums.FriendStatus;
import work.nguyentruonganhkiet.api.repositories.UserRepository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class UserService implements UserDetailsService, IBaseService<User, Long> {

	private final UserRepository userRepository;
	private final RoomService roomService;

	@Autowired
	public UserService( UserRepository userRepository , RoomService roomService ) {
		this.userRepository = userRepository;
		this.roomService = roomService;
	}

	@Override
	@Transactional
	public UserDetails loadUserByUsername( String username ) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

		if (user.isDelete()) throw new UsernameNotFoundException("User Not Found with username: " + username);

		List<GrantedAuthority> authorities = new ArrayList<>();

		Set<Role> userRoles = user.getRoles();
		for (Role role : userRoles)
			authorities.add(new SimpleGrantedAuthority(role.getName()));

		return CustomUserDetails.build(user);
	}

	@Override
	public User findById( Long id ) {
		return this.userRepository.findById(id).orElse(null).isDelete() ? null : this.userRepository.findById(id).orElse(null);
	}

	@Override
	public User save( User entity ) {
		return this.userRepository.save(entity);
	}

	@Override
	public User update( User entity , Long id ) {
		return this.userRepository.save(entity);
	}

	@Override
	public User delete( User entity ) {
		entity.setDelete(true);
		return this.userRepository.save(entity);
	}

	@Override
	public List<User> findAll() {
		return this.userRepository.findAll().stream().filter(user -> ! user.isDelete()).collect(Collectors.toList());
	}

	public User findByEmail( String email ) {
		return this.userRepository.findByEmail(email).orElse(null);
	}

	public boolean processFriendStatus( User user , User friend , FriendStatus friendStatus ) {
		try {

//			Friend f = user.getFriends().stream().map(fz -> fz.getUsers().stream().filter(user1 -> user1.getEmail().equals(friend.getEmail())).findFirst().get()).findFirst().get();


			Friend f = user.getFriends().stream().filter(fz -> fz.getUsers().stream().filter(user1 -> user1.getEmail().equals(friend.getEmail())).findFirst().get() != null).findFirst().get();

			f.setStatus(friendStatus);

			if (friendStatus.equals(FriendStatus.ACCEPTED)) {
				Set<User> users = new HashSet<>();
				users.add(user);
				users.add(friend);
				Room room = Room.builder().users(users).build();
				this.roomService.save(room);
				this.save(user);
			}

			if (friendStatus.equals(FriendStatus.REJECTED)) {
				this.deleteFriend(user , friend);
			}
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public boolean deleteFriend( User user , User friend ) {
		try {
//			Set<Friend> us = user.getFriends().stream().map(f -> {
//				if (f.getUser().getId().equals(friend.getId())) {
//					user.getFriends().remove(f);
//				}
//				return f;
//			}).collect(Collectors.toSet());

			Set<Friend> us = user.getFriends().stream().map(f -> f.getUsers().stream().map(user1 -> {
				if (user1.getId().equals(friend.getId())) {
					f.getUsers().remove(user1);
				}
				return f;
			}).collect(Collectors.toSet()).stream().findFirst().get()).collect(Collectors.toSet());

			user.setFriends(us);

			this.save(user);

			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public User getRandomUser() {
		return this.userRepository.findAll().stream().filter(user -> ! user.isDelete()).findAny().orElse(null);
	}

	public long count() {
		return this.userRepository.count();
	}

	public List<User> getUsersByLastName( String lastName ) {
		return this.findAll().stream().filter(f -> f.getUserInfo().getLastName().contains(lastName)).toList();
	}

}
