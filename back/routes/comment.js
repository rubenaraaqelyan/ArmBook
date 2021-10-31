const router = require('express').Router();
const handlers = require('../handlers/comment');
const authorization = require('../middlewares/authorization');

router.post('/comment', authorization, handlers.createComment);

router.patch('/comment/:id', authorization, handlers.updateComment);

router.patch('/comment/:id/like', authorization, handlers.likeComment);

router.patch('/comment/:id/unlike', authorization, handlers.unLikeComment);

router.delete('/comment/:id', authorization, handlers.deleteComment);


module.exports = router;
