package work.nguyentruonganhkiet.api.utils.constant;

public class API {

	public static final String API_VERSION = "v1";

	public static final String API_PREFIX = "/api";
	public static final String API_PREFIX_V1 = API_PREFIX + "/" + API_VERSION;

	public static final String API_ENDPOINTS_AUTH = API_PREFIX_V1 + "/auth";

	public static final String API_ENDPOINTS_AUTH_LOGIN = "/login";

	public static final String API_ENDPOINTS_AUTH_REGISTER = "/register";

	public static final String API_ENDPOINTS_AUTH_ME = "/me";

	public static final String API_ENDPOINTS_USERS = API_PREFIX_V1 + "/users";

	public static final String API_ENDPOINTS_POSTS = API_PREFIX_V1 + "/posts";

	public static final String API_ENDPOINTS_COMMENTS = API_PREFIX_V1 + "/comments";

	public static final String API_ENDPOINTS_STORIES = API_PREFIX_V1 + "/stories";

	public static final String FRIENDS = "/friends";

	public static final String ALL = "/all";

	public static final String CREATE = "/create";

	public static final String GET_ID = "/get/{id}";

	public static final String UPDATE_ID = "/update/{id}";

	public static final String DELETE_ID = "/delete/{id}";

	public static final String REACT_ID = "/react/{id}";

	public static final String COMMENT_ID = "/comment/{id}";


	public static final String GET_FRIENDS = "/get-friends";
	public static final String SETTINGS_UPDATE = "/settings/update";
	public static final String UTILS_ADD_FRIEND = "/utils/add-friend";
	public static final String UTILS_CHANGE_STATUS_FRIEND = "/utils/change-status-friend";
	public static final String GET_IMAGE_OF_USER = "/get-image-of-user";
	public static final String LOCK_ACCOUNT = "/lock-account";


}
