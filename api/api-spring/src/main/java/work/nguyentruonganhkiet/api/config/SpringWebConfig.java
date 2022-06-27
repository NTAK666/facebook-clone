package work.nguyentruonganhkiet.api.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.HiddenHttpMethodFilter;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@ComponentScan(basePackages = "work.nguyentruonganhkiet.api")
public class SpringWebConfig implements WebMvcConfigurer {

	@Override
	public void addResourceHandlers( ResourceHandlerRegistry registry ) {
		registry.addResourceHandler(
						"/master/**" ,
						"/video/**" ,
						"/ajax/**" ,
						"/img/**" ,
						"/css/**" ,
						"/js/**" ,
						"/vendor/**" ,
						"/scss/**" ,
						"/images/**")
				.addResourceLocations(
						"classpath:/static/master/" ,
						"classpath:/static/video/" ,
						"classpath:/static/ajax/" ,
						"classpath:/static/img/" ,
						"classpath:/static/css/" ,
						"classpath:/static/js/" ,
						"classpath:/static/vendor/" ,
						"classpath:/static/scss/" ,
						"classpath:/static/images/"
				);
	}

	@Bean
	public FilterRegistrationBean hiddenHttpMethods() {
		FilterRegistrationBean registration = new FilterRegistrationBean(new HiddenHttpMethodFilter());
		registration.addUrlPatterns("/*");
		return registration;
	}

	@Override
	public void configurePathMatch( PathMatchConfigurer configurer ) {
		configurer.setUseTrailingSlashMatch(false);
	}

}
