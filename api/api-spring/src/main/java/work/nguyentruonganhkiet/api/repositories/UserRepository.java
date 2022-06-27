package work.nguyentruonganhkiet.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import work.nguyentruonganhkiet.api.model.entities.Post;
import work.nguyentruonganhkiet.api.model.entities.Room;
import work.nguyentruonganhkiet.api.model.entities.User;

import java.util.Optional;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Long>, JpaRepository<User, Long>, CrudRepository<User, Long> {

	Optional<User> findByEmail( String email );

	Boolean existsByEmail( String username );
}
