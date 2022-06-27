package work.nguyentruonganhkiet.api.model.dtos.responses;


import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

@Getter
@Setter

@Builder
public class JwtDto {
	private String token;
	private String type;
	private UserDetails user;
	private int expiresIn;
	private List<String> roles;
}
