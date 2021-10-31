const router = require('express').Router();
const handlers = require('../handlers/message');
const authorization = require('../middlewares/authorization');

router.post('/message', authorization, handlers.createMessage);

router.get('/conversations', authorization, handlers.getConversations);

router.get('/message/:id', authorization, handlers.getMessages);

router.delete('/message/:id', authorization, handlers.deleteMessages);

router.delete('/conversation/:id', authorization, handlers.deleteConversation);


module.exports = router;
