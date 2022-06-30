package work.nguyentruonganhkiet.api.model.dtos.responses;


import lombok.*;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.FieldError;
import work.nguyentruonganhkiet.api.utils.constant.STATUS;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageReturnDto<T> {
    private Integer status;

    private String message;

    private T data;

    private Pageable paginate;

    private final String buildVersion = "Version 1.1.1";

    private final String buildDate = "30-06-2022";

    private final String buildDetails = "Change some entities and add seeding data";

    @Getter
    @Setter
    public static class PaginationInfo {
        private Integer totalPage;

        private Integer totalItem;

        private Integer currentPage;

        private Integer perPage;

        private Integer totalItemPage;
    }

    public static MessageReturnDto getExceptionReturn() {
        return MessageReturnDto.builder()
                .status(STATUS.HTTP_INTERNAL_SERVER_ERROR)
                .message(STATUS.HTTP_INTERNAL_SERVER_ERROR_MESSAGE)
                .build();
    }

    public static MessageReturnDto getBadRequestReturn() {
        return MessageReturnDto.builder()
                .status(STATUS.HTTP_BAD_REQUEST)
                .message(STATUS.HTTP_BAD_REQUEST_MESSAGE)
                .build();
    }

    public static MessageReturnDto getNotFoundReturn() {
        return MessageReturnDto.builder()
                .status(STATUS.HTTP_NOT_FOUND)
                .message(STATUS.HTTP_NOT_FOUND_MESSAGE)
                .build();
    }

    public static <T> MessageReturnDto getOkReturn(T data) {
        return MessageReturnDto.builder()
                .status(STATUS.HTTP_OK)
                .message(STATUS.HTTP_OK_MESSAGE)
                .data(data)
                .build();
    }

    public static <T> MessageReturnDto getOkReturn() {
        return MessageReturnDto.builder()
                .status(STATUS.HTTP_OK)
                .message(STATUS.HTTP_OK_MESSAGE)
                .build();
    }

    public static MessageReturnDto getUnvalidReturn(List<FieldError> data) {
        return MessageReturnDto.builder()
                .status(STATUS.HTTP_BAD_REQUEST)
                .message(STATUS.HTTP_BAD_REQUEST_MESSAGE)
                .data(data)
                .build();
    }

    public static MessageReturnDto getCustomOKMessage(String message) {
        return MessageReturnDto.builder()
                .status(STATUS.HTTP_OK)
                .message(message)
                .build();
    }

    public static MessageReturnDto getCustomExceptionMessage(String message) {
        return MessageReturnDto.builder()
                .status(STATUS.HTTP_INTERNAL_SERVER_ERROR)
                .message(message)
                .build();
    }

}
