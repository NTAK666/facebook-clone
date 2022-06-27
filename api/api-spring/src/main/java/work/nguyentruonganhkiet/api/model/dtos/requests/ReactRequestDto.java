package work.nguyentruonganhkiet.api.model.dtos.requests;

import lombok.Getter;
import lombok.Setter;
import work.nguyentruonganhkiet.api.model.enums.ReactType;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class ReactRequestDto {
	@NotNull
	ReactType reactType;
}
