package work.nguyentruonganhkiet.api.config;


import com.github.javafaker.Faker;
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

    @Bean
    public Faker faker() {
        return new Faker();
    }

}
