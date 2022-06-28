package work.nguyentruonganhkiet.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import work.nguyentruonganhkiet.api.model.entities.Comment;

@Repository

public interface CommentRepository extends PagingAndSortingRepository<Comment, Long>, JpaRepository<Comment, Long>, CrudRepository<Comment, Long> {
}
