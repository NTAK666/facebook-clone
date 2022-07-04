package work.nguyentruonganhkiet.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import work.nguyentruonganhkiet.api.model.entities.Post;
import work.nguyentruonganhkiet.api.model.entities.User;
import work.nguyentruonganhkiet.api.model.sub.CommentPost;
import work.nguyentruonganhkiet.api.model.sub.ReactPost;
import work.nguyentruonganhkiet.api.repositories.PostRepository;
import work.nguyentruonganhkiet.api.utils.files.SaveFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService implements IBaseService<Post, Long> {

    private final PostRepository postRepository;

    private final SaveFile saveFile;

    @Autowired
    public PostService(
            PostRepository postRepository,
            SaveFile saveFile
    ) {
        this.postRepository = postRepository;
        this.saveFile = saveFile;
    }


    @Override
    public Post findById(Long id) {
        return this.postRepository.findById(id).orElse(null).isDelete() ? null : this.postRepository.findById(id).orElse(null);
    }

    @Override
    public Post save(Post entity) {
        if (entity.getThumbnail() != null) {
            try {
                String path = saveFile.save(entity.getThumbnail(), "", "");
                entity.setThumbnail(path);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return this.postRepository.save(entity);
    }

    public Post saveStatic(Post post) {
        return this.postRepository.save(post);
    }

    @Override
    public Post update(Post entity, Long id) {
        return this.postRepository.save(entity);
    }

    @Override
    public Post delete(Post entity) {
        entity.setDelete(true);
        return this.postRepository.save(entity);
    }

    @Override
    public List<Post> findAll() {
        List<Post> posts = (List<Post>) this.postRepository.findAll();
        return posts.stream().filter(post -> !post.isDelete()).collect(Collectors.toList());
    }

    public List<Post> findAllByUserId(Long id, Pageable pageable) {
        return this.postRepository.findAllByUserId(id, pageable).stream().map(post -> post.isDelete() ? null : post).collect(Collectors.toList());
    }

    public Post commentToPost(Post p, CommentPost comment) {
        p.getCommentPosts().add(comment);
        return this.postRepository.save(p);
    }

    public Post reactToPost(Post p, ReactPost react) {
        p.getReactPosts().add(react);
        return this.postRepository.save(p);
    }

    public long count() {
        return this.postRepository.count();
    }

//    public List<Post> findAllPostsOfFriends( User user , Pageable pageable ) {
//        return this.postRepository.findAllPostsOfFriends(user, pageable).stream().map(post -> post.isDelete() ? null : post).collect(Collectors.toList());
//    }
}
