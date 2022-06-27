package work.nguyentruonganhkiet.api.service;

import org.springframework.stereotype.Service;
import work.nguyentruonganhkiet.api.model.entities.Room;
import work.nguyentruonganhkiet.api.repositories.RoomRepository;

import java.util.List;

@Service
public class RoomService implements IBaseService<Room, Long> {

	private final RoomRepository roomRepository;

	public RoomService( RoomRepository roomRepository ) {
		this.roomRepository = roomRepository;
	}

	@Override
	public Room findById( Long id ) {
		return this.roomRepository.findById(id).orElse(null).isDelete() ? null : this.roomRepository.findById(id).orElse(null);
	}

	@Override
	public Room save( Room entity ) {
		return this.roomRepository.save(entity);
	}

	@Override
	public Room update( Room entity , Long id ) {
		return this.roomRepository.save(entity);
	}

	@Override
	public Room delete( Room entity ) {
		return this.roomRepository.save(entity);
	}

	@Override
	public List<Room> findAll() {
		return this.roomRepository.findAll().stream().filter(room -> ! room.isDelete()).toList();
	}
}
