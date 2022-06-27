package work.nguyentruonganhkiet.api.controller.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import work.nguyentruonganhkiet.api.repositories.PostRepository;
import work.nguyentruonganhkiet.api.repositories.ReactRepository;
import work.nguyentruonganhkiet.api.repositories.StoryRepository;
import com.google.common.io.Resources;
import work.nguyentruonganhkiet.api.utils.files.SaveFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Objects;


@RestController
@RequestMapping("/api/test")
public class TestController {

	@Autowired
	private StoryRepository storyRepository;
	@Autowired
	private ReactRepository reactRepository;
	@Autowired
	private PostRepository postRepository;

	@GetMapping("/all")
	public String allAccess( @RequestBody String image ) throws IOException {
		SaveFile save = new SaveFile();
		String path = save.save(image , "" , "");
		return path;
	}

	@GetMapping("/user")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public String userAccess() {
		return "User Content.";
	}

	@GetMapping("/mod")
	@PreAuthorize("hasRole('MODERATOR')")
	public String moderatorAccess() {
		return "Moderator Board.";
	}

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminAccess() {
		return "Admin Board.";
	}


}
