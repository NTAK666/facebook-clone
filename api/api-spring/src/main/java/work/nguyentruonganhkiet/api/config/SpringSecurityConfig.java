package work.nguyentruonganhkiet.api.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import work.nguyentruonganhkiet.api.model.dtos.CustomUserDetails;
import work.nguyentruonganhkiet.api.service.UserService;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
		prePostEnabled = true
)
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	UserService userDetailsService;

	@Autowired
	private AuthenticationEntryPointHandler unauthorizedHandler;

	@Bean
	public AuthenticationFilter authenticationJwtTokenFilter() {
		return new AuthenticationFilter();
	}

	@Override
	public void configure( AuthenticationManagerBuilder authenticationManagerBuilder ) throws Exception {
		authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Component("userSecurity")
	public class UserSecurity {
		public boolean hasUserId( Authentication auth , Long userId ) {
			if (auth == null)
				return false;
			try {
				CustomUserDetails currentUser = (CustomUserDetails) auth.getPrincipal();
				if (currentUser != null)
					return currentUser.getUser().getId().equals(userId);
				else return false;
			} catch (Exception e) {
				return false;
			}
		}
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure( HttpSecurity http ) throws Exception {
		http.cors().and().csrf().disable()
				.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.authorizeRequests().antMatchers("/api/v1/auth/**").permitAll()
				.antMatchers("/api/v1/test/**").permitAll()
				.antMatchers("/api-docs/**").permitAll()
				.antMatchers("/swagger-ui.html/**").permitAll()
				.antMatchers("/swagger-ui/**").permitAll()
				.antMatchers("/images/**").permitAll()
				.antMatchers("/ws/**").permitAll()
				.anyRequest().authenticated();

		http.addFilterBefore(authenticationJwtTokenFilter() , UsernamePasswordAuthenticationFilter.class);
	}

}
