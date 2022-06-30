package work.nguyentruonganhkiet.api.model.observe;

import work.nguyentruonganhkiet.api.model.entities.UserInfo;

import javax.persistence.PostPersist;

public class UserInfoObsever {

    @PostPersist
    public void postPersist(UserInfo userInfo) {



    }

}
