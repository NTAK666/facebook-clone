package work.nguyentruonganhkiet.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import work.nguyentruonganhkiet.api.model.entities.Notification;

public interface NotificationRepository extends PagingAndSortingRepository<Notification, Long>, JpaRepository<Notification, Long>, CrudRepository<Notification, Long> {
}
