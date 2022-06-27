package work.nguyentruonganhkiet.api.model.dtos;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import work.nguyentruonganhkiet.api.model.entities.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails {

	User user;
	private Collection<? extends GrantedAuthority> authorities;

	public CustomUserDetails( User user , List<GrantedAuthority> authorities ) {
		this.user = user;
		this.authorities = authorities;
	}

	public static CustomUserDetails build( User user ) {
		List<GrantedAuthority> authorities = new ArrayList<>();
		user.getRoles().forEach(r -> {
			authorities.add(new SimpleGrantedAuthority(r.getName()));
			r.getPermissions().forEach(p -> authorities.add(new SimpleGrantedAuthority(p.getName())));
		});

		return new CustomUserDetails(user , authorities);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> authorities = new ArrayList<>();
		user.getRoles().forEach(r -> {
			authorities.add(new SimpleGrantedAuthority(r.getName()));
			r.getPermissions().forEach(p -> authorities.add(new SimpleGrantedAuthority(p.getName())));
		});
		return authorities;
	}

	public User getUser() {
		return this.user;
	}

	@Override
	public String getPassword() {
		return this.user.getPassword();
	}

	@Override
	public String getUsername() {
		return this.user.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return ! this.user.isDelete();
	}
}
