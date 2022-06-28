package work.nguyentruonganhkiet.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import work.nguyentruonganhkiet.api.model.entities.Notification;
@Repository

public interface NotificationRepository extends PagingAndSortingRepository<Notification, Long>, JpaRepository<Notification, Long>, CrudRepository<Notification, Long> {
}
