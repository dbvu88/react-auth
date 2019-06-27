import * as Yup from "yup";
import {
    authenticationService
} from "../_services";

const initialValues = {
    username: "",
    password: ""
}

const getInputClassName = (classname, value, error, touched) => {
    let modifier = null;

    if (value && touched && !error) {
        modifier = "is-success";
    } else {
        modifier = "is-danger";
    }

    return classname + " " + modifier;
}



const validationSchema = () => {
    return Yup.object().shape({
        username: Yup.string().required("username is required"),
        password: Yup.string().required("password is required")
    })
}

export const handleLogin = {
    initialValues,
    getInputClassName,
    validationSchema
}