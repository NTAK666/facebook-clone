package work.nguyentruonganhkiet.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import work.nguyentruonganhkiet.api.model.entities.Comment;
import work.nguyentruonganhkiet.api.model.entities.Post;
import work.nguyentruonganhkiet.api.model.sub.CommentPost;
import work.nguyentruonganhkiet.api.model.sub.ReactComment;
import work.nguyentruonganhkiet.api.repositories.CommentRepository;
import work.nguyentruonganhkiet.api.repositories.PostRepository;

import java.util.List;

@Service
public class CommentService implements IBaseService<Comment, Long> {

    private final CommentRepository commentRepository;

    private final PostRepository postRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    @Override
    public Comment findById(Long id) {
        return this.commentRepository.findById(id).orElse(null).isDelete() ? null : this.commentRepository.findById(id).orElse(null);
    }

    @Override
    public Comment save(Comment entity) {
        return this.commentRepository.save(entity);
    }

    @Override
    public Comment update(Comment entity, Long id) {
        return this.commentRepository.save(entity);
    }

    @Override
    public Comment delete(Comment entity) {
        entity.setDelete(true);
        return this.commentRepository.save(entity);
    }

    @Override
    public List<Comment> findAll() {
        return this.commentRepository.findAll().stream().filter(comment -> !comment.isDelete()).toList();
    }

    public Comment reactToComment(Comment comment, ReactComment reactComment) {
        comment.getReactComments().add(reactComment);
        return this.commentRepository.save(comment);
    }

    public List<CommentPost> findByPostId(Long id) {
        Post post = this.postRepository.findById(id).orElse(null);
        assert post != null;
        return post.getCommentPosts().stream().filter(comment -> !comment.isDelete()).toList();
    }
}
