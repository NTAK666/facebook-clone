package work.nguyentruonganhkiet.api.repositories;

import org.springframework.beans.PropertyValues;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import work.nguyentruonganhkiet.api.model.entities.Story;

import java.util.List;

@Repository
public interface StoryRepository extends PagingAndSortingRepository<Story, Long>, JpaRepository<Story, Long>, CrudRepository<Story, Long> {

	List<Story> findAllByUserId( Long id , Pageable pageable );
}
