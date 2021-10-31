import { validateEmail } from './utilites';

const valid = ({firstName, lastName, email, password, cf_password}, touched) => {
    const err = {}

    if(!firstName && touched.firstName ) {
        err.firstName = "Please add your full name."
    }else if(firstName?.length > 25){
        err.firstName = "Full name is up to 25 characters long."
    }

    if(!lastName && touched.lastName) {
        err.lastName = "Please add your user name."
    }else if(lastName?.replace(/ /g, '')?.length > 25){
        err.lastName = "User name is up to 25 characters long."
    }

    if(!email && touched.email) {
        err.email = "Please add your email."
    }else if(!validateEmail(email) && touched.email){
        err.email = "Email format is incorrect."
    }

    if(!password && touched.password) {
        err.password = "Please add your password."
    }else if(password?.length < 6 && touched.password){
        err.password = "Password must be at least 6 characters."
    }

    if(password !== cf_password && touched.password && touched.cf_password) {
        err.cf_password = "Confirm password did not match."
    }

    console.log(err)
    return err;
}


export default valid;
