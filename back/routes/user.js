const router = require('express').Router();
const authorization = require("../middlewares/authorization");
const handlers = require("../handlers/user");
const multer = require('multer');
const { upload } = require('../middlewares/postImageUploadMiddleware.js');


router.get('/search', authorization, handlers.searchUser);

router.get('/user', authorization, handlers.getUser);

router.get('/user/:id', authorization, handlers.getUserById);

router.put('/user',upload.single('avatar'), authorization, handlers.updateUser);

router.post('/user/:id/addFriend', authorization, handlers.addFriend);

router.post('/user/:id/cancelFriend', authorization, handlers.cancelFriend);

router.get('/userData/follow_requests', authorization , handlers.getOwnFollowingRequests);

router.get('/userData/followers', authorization , handlers.getFollowers);

router.get('/userData/friends', authorization , handlers.getFriends);

router.get('/userData/get_sended_friends', authorization , handlers.getSendedFriends);

router.post('/userData/accept_follow', authorization, handlers.acceptFollowingRequest);

router.delete('/userData/deny/:id', authorization, handlers.denyFriendRequest);

router.get('/suggestionsUser', authorization, handlers.suggestionsUser);

router.post('/reset_password', authorization, handlers.resetPassword);

router.put('/confirm_email', authorization, handlers.changePassword);

module.exports = router


