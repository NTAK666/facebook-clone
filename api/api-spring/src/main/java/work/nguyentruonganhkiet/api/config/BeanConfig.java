package work.nguyentruonganhkiet.api.config;


import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import work.nguyentruonganhkiet.api.utils.files.SaveFile;

@Configuration

public class BeanConfig {
	@Bean
	public SaveFile saveFile() {
		return new SaveFile();
	}
}
