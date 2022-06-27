package work.nguyentruonganhkiet.api.utils.files;

import org.apache.commons.lang3.RandomStringUtils;
import org.hibernate.id.GUIDGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;
import java.util.Date;

public class SaveFile {

	ResourceLoader resourceLoader = new DefaultResourceLoader();

	@Value("${app.url}")
	String host;

	@Value("${server.port}")
	String port;

	String fullUrl = host + ":" + port;

	public String save( String image , String folder , String fileName ) throws IOException {
		String imageString = image.substring(image.indexOf(",") + 1);
		String fileExt = imageString.charAt(0) == 'i' ? ".png" : imageString.charAt(0) == 'U' ? ".webp" : imageString.charAt(0) == '/' ? ".jpg" : imageString.charAt(0) == 'R' ? ".gif" : ".png";
		String newFileName = generateUniqueFileName();
		String _fileName = fileName.equals("") ? newFileName : fileName;
		String _folder = folder.equals("") ? "images" : folder;
		Resource path = this.resourceLoader.getResource("classpath:static");
		String pathString = path.getURL().getPath();
		pathString = pathString.substring(1).substring(0 , pathString.indexOf("/target"));
		pathString += _folder.equals("images") ? "/src/main/resources/static/images/" : "/src/main/resources/static/images/" + _folder + "/";
		String fullPath = pathString + _fileName + fileExt;
		byte[] decodedBytes = Base64.getMimeDecoder().decode(imageString);
		Files.write(Path.of(fullPath) , decodedBytes);

		return fullUrl + "/" + _folder + "/" + _fileName + fileExt;
	}

	String generateUniqueFileName() {
		String filename = "";
		long millis = System.currentTimeMillis();
		String datetime = new Date().toGMTString();
		datetime = datetime.replace(" " , "");
		datetime = datetime.replace(":" , "");
		String rndchars = RandomStringUtils.randomAlphanumeric(16);
		filename = rndchars + "_" + datetime + "_" + millis;
		return filename;
	}

}
