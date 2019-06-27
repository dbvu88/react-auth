import * as Yup from "yup";
import {
    authenticationService
} from "../_services";

const initialValues = {
    username: "",
    password: ""
}

const getInputClassName = (type, value, error, touched) => {
    let classname = null;

    if (value && touched && !error) {
        classname = "is-success";
    } else {
        classname = "is-danger";
    }

    return type + " " + classname;
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