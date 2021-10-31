const router = require('express').Router();
const handlers = require('../handlers/post');
const authorization = require('../middlewares/authorization');
const {upload} = require('../middlewares/postImageUploadMiddleware.js');

router.route('/posts/:postId')
    .post(upload.single('image'), authorization, handlers.createOrUpdatePostImage)
    .patch(authorization, handlers.createOrUpdatePostContent)

router.get("/posts", authorization, handlers.getPosts);


router.route('/post/:id')
    .put(upload.single('image'), authorization, handlers.updatePost)
    .get(authorization, handlers.getPost)
    .delete(authorization, handlers.deletePost)

router.post('/post/:id/like', authorization, handlers.likePost);

router.delete('/post/:id/unlike', authorization, handlers.unLikePost);

router.get('/user_posts/:id', authorization, handlers.getUserPosts);

router.get('/post_discover', authorization, handlers.getPostsDiscover);

router.patch('/savePost/:id', authorization, handlers.savePost);

router.patch('/unSavePost/:id', authorization, handlers.unSavePost);

router.get('/getSavePosts', authorization, handlers.getSavePosts);


module.exports = router;
