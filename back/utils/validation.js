const { check } = require("express-validator");
const { Users } = require("../models/user");

module.exports.createValidationArray = [
    check("firstName")
        .exists()
        .withMessage("First Name doesn't exist !")
        .notEmpty()
        .withMessage("First Name is empty !")
        .isString()
        .withMessage("First Name must be string")
        .isLength({ min: 6 })
        .withMessage("First Name must be min 6 characters")
        .isLength({ max: 20 })
        .withMessage("First Name must be max 20 characters")
        .custom((value) => !/\s/.test(value))
        .withMessage("No spaces are allowed in the First Name"),
    check("lastName")
        .exists()
        .withMessage("Last Name doesn't exist !")
        .notEmpty()
        .withMessage("Last Name is empty !")
        .isString()
        .withMessage("Last Name must be string")
        .isLength({ min: 6 })
        .withMessage("Last Name must be min 6 characters")
        .isLength({ max: 20 })
        .withMessage("Last Name must be max 20 characters")
        .custom((value) => !/\s/.test(value))
        .withMessage("No spaces are allowed in the Last Name"),
    check("email")
        .exists()
        .withMessage("Email doesn't exist !")
        .notEmpty()
        .withMessage("Email is empty")
        .isEmail()
        .withMessage("Invalid email")
        .custom(async (email) => {
            await User.findOne({ where: { email } }).then((user) => {
                if (user) {
                    throw new Error("User already exist");
                }
            });
            return true;
        }),
    check("password")
        .exists()
        .withMessage("Password doesn't exist !")
        .notEmpty()
        .withMessage("Password is a empty")
        .isLength({ min: 6 })
        .withMessage("Password must be min 6 characters")
        .isLength({ max: 20 })
        .withMessage("Password must be max 20 characters")
        .withMessage("No spaces are allowed in the Password"),
    check("checkPassword")
        .exists()
        .withMessage("checkPassword doesn't exist !")
        .notEmpty()
        .withMessage("Password confirmation is empty")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password confirmation is a wrong");
            }
            return true;
        }),
];

module.exports.loginValidationArray = [
    check("email")
        .exists()
        .withMessage("Email doesn't log in !")
        .isString()
        .withMessage("Email doesn't log in !")
        .notEmpty()
        .withMessage("Email is empty !"),
    check("password")
        .exists()
        .withMessage("Password doesn't exist !")
        .isString()
        .withMessage("Password doesn't exist !")
        .notEmpty()
        .withMessage("Password is empty !"),
];

module.exports.resetPasswordValidationArray = [
    check("email")
        .notEmpty()
        .withMessage("Email is empty !")
        .custom(async (email) => {
            await Users.findOne({ where: { email } }).then((user) => {
                if (!user) {
                    throw new Error("User not found !");
                }
            });
            return true;
        }),
];
