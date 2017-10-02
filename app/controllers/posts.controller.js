import { notifier } from '../utils/notifier';
import { data } from '../data/data';
import { templateLoader as tl} from '../utils/template-loader';
import { Post } from '../models/post';
import { Comment } from '../models/comment';

class PostsController {

    loadPublishPost() {

        data.users.isAdmin()
        .then((result) => {
            if (result.isAdmin === 'false') {
                notifier.error('Only admin can publish posts!');
                location.href = '#/home';
                return;
            }
        })
        .then(() => {
        Promise.all([tl.loadTemplate('publishpost')])
            .then((template) => $('#main').html(template))
            .then(() => {

                $('#publish-post-form').on('submit', function(e) {
                    e.preventDefault();

                    const category = $('#select-post-category').val();
                    const title = $('#post-title').val();
                    const content = $('#post-content').val();
                    const imageUrl = $('#post-image-url').val();
                    const tags = $('#post-tags').val();

                    const post = new Post(title, content, category, imageUrl, tags);

                    data.posts.publishPost(post)
                    .then(
                        result => {
                            notifier.success(`New post was published`);
                            location.href = `#/posts/${result.result.id}`;
                        },
                        errorMsg => {
                            notifier.error(errorMsg.responseJSON);
                            location.href = '#/login';
                        }
                    )
                    .catch(console.log);
                });
            })
            .catch(console.log);
        });
    }

    loadPost(id) {

        $("#submit-comment").off();
        let self = this;

        data.posts.getPost(id)
        .then((result) => {
            if (!!result && !!result.post && typeof result.post.id === 'number') {
            
                Promise.all([
                    result,
                    data.posts.getRelatedPosts(result.post.categoryId, result.post.id),
                    data.posts.getRecentPosts(4),
                    data.posts.getPopularPosts(),
                    data.widgets.getSidebarWidget(),
                    tl.loadTemplate('singepost')
                ])
                .then(([result, template]) => 
                    $('#main').html(template({result, sidebarWidget}))
                )
                .then(() => {
                    data.users.isAdmin()
                    .then((result) => {
                        if (result.isAdmin === 'true') {
                            $('#admin-edit-delete').removeClass('hidden');
                        } else {
                            $('#admin-edit-delete').addClass('hidden');
                        }
                    })
                    .catch(console.log);
                })
                .then(() => {
                    $("#submit-comment").click(function() {
                        const commentText = $("#comment-text").val();
                        
                        const newComment = new Comment(commentText);

                        const postId = window.location.hash.replace(/\D/g, '');

                        const newCommentWithId = {
                            postId: postId,
                            text: newComment.text
                        };

                        data.posts.postComment(newCommentWithId)
                        .then(
                            result => {
                                notifier.success(`Your comment was posted successfully`);
                                self.loadPost(id);
                            },
                            errorMsg => {
                                notifier.error(errorMsg.responseJSON);
                            }
                        );
                    });

                    $(".reply-comment-button").click(function() {
                        const replyForm = $(this).parent().next();
                        replyForm.removeClass('hidden');

                        $(".submit-reply-comment").click(function() {
                            const commentId = $(this).attr("data-commentId");
                            const replyCommentText = $(this).prev().prev().val();
                            
                            const newComment = new Comment(replyCommentText);

                            const newReplyComment = {
                                commentId: commentId,
                                text: newComment.text
                            };

                            data.posts.postReplyComment(newReplyComment)
                            .then(
                                result => {
                                    notifier.success(`Your comment was posted successfully`);
                                    self.loadPost(id);
                                },
                                errorMsg => {
                                    notifier.error(errorMsg.responseJSON);
                                }
                            );

                            $(this).parent().parent().parent().addClass('hidden');

                        });
                    });
                })
                .catch(console.log);
            } else {
                location.href = '#/404';
            }
        });
    }
}

let postsController = new PostsController();
export { postsController };