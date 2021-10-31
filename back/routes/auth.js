const  router  = require('express').Router();
const handlers  = require('../handlers/auth');
const {createValidationArray} = require("../utils/validation");
const {loginValidationArray} = require("../utils/validation");
const authorization = require('../middlewares/authorization.js');


router.post('/register',createValidationArray, handlers.register);

router.get("/user_data", authorization, handlers.getUserData);

router.post('/login', handlers.login);

router.post('/logout', handlers.logout);

router.post('/refresh_token', handlers.generateAccessToken);


module.exports = router;

