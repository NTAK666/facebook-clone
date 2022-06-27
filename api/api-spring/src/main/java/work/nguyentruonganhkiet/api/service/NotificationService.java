package work.nguyentruonganhkiet.api.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.nguyentruonganhkiet.api.model.entities.*;
import work.nguyentruonganhkiet.api.model.enums.NotificationType;
import work.nguyentruonganhkiet.api.repositories.NotificationRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService implements IBaseService<Notification, Long> {

	@Autowired
	private NotificationRepository notificationRepository;

	@Override
	public Notification findById( Long id ) {
		return this.notificationRepository.findById(id).orElse(null).isDelete() ? null : this.notificationRepository.findById(id).orElse(null);
	}

	@Override
	public Notification save( Notification entity ) {
		return this.notificationRepository.save(entity);
	}

	@Override
	public Notification update( Notification entity , Long id ) {
		return this.notificationRepository.save(entity);
	}

	@Override
	public Notification delete( Notification entity ) {
		entity.setDelete(true);
		return this.notificationRepository.save(entity);
	}

	@Override
	public List<Notification> findAll() {
		return this.notificationRepository.findAll().stream().filter(notification -> ! notification.isDelete()).collect(Collectors.toList());
	}

	public Notification reactPostNotification( Post post , User userRef , User owner , Notification noti ) {
		noti.setPostRef(post);
		noti.setUserRef(userRef);
		noti.setOwner(owner);
		noti.setType(NotificationType.REACT_POST);
		return this.save(noti);
	}

	public Notification commentPostNotification( Post post , User userRef , User owner , Notification noti ) {
		noti.setPostRef(post);
		noti.setUserRef(userRef);
		noti.setOwner(owner);
		noti.setType(NotificationType.COMMENT_POST);
		return this.save(noti);
	}

	public Notification reactStoryNotification( Story story , User userRef , User owner , Notification noti ) {
		noti.setStoryRef(story);
		noti.setUserRef(userRef);
		noti.setOwner(owner);
		noti.setType(NotificationType.REACT_STORY);
		return this.save(noti);
	}

	public Notification commentStoryNotification( Story story , User userRef , User owner , Notification noti ) {
		noti.setStoryRef(story);
		noti.setUserRef(userRef);
		noti.setOwner(owner);
		noti.setType(NotificationType.COMMENT_STORY);
		return this.save(noti);
	}

	public Notification reactCommentNotification( Comment comment , User userRef , User owner , Notification noti ) {
		noti.setCommentRef(comment);
		noti.setUserRef(userRef);
		noti.setOwner(owner);
		noti.setType(NotificationType.REACT_COMMENT);
		return this.save(noti);
	}
}
