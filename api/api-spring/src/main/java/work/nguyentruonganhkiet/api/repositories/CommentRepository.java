package work.nguyentruonganhkiet.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import work.nguyentruonganhkiet.api.model.entities.Comment;

public interface CommentRepository extends PagingAndSortingRepository<Comment, Long>, JpaRepository<Comment, Long>, CrudRepository<Comment, Long> {
}
