package work.nguyentruonganhkiet.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import work.nguyentruonganhkiet.api.model.entities.Message;
import work.nguyentruonganhkiet.api.model.entities.Post;

public interface MessageRepository extends PagingAndSortingRepository<Message, Long>, JpaRepository<Message, Long>, CrudRepository<Message, Long> {
}
