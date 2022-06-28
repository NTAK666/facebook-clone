package work.nguyentruonganhkiet.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import work.nguyentruonganhkiet.api.model.entities.Friend;
import work.nguyentruonganhkiet.api.model.entities.Post;
@Repository

public interface FriendRepository extends PagingAndSortingRepository<Friend, Long>, JpaRepository<Friend, Long>, CrudRepository<Friend, Long> {
}
