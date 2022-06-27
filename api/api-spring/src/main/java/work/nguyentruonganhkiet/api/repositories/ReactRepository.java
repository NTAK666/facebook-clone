package work.nguyentruonganhkiet.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import work.nguyentruonganhkiet.api.model.entities.Post;
import work.nguyentruonganhkiet.api.model.entities.React;

public interface ReactRepository extends PagingAndSortingRepository<React, Long>, JpaRepository<React, Long>, CrudRepository<React, Long> {
}
