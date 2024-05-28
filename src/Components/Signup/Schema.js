import * as Yup from "yup";

export const Schema = Yup.object({
    UserName: Yup.string().min(6).required("Please enter your user name"),
    UserFName: Yup.string().min(3).required("Please enter your first name"),
    UserLName: Yup.string().min(3).required("Please enter your last name"),
    UserEmail: Yup.string().email().required("Please enter your email"),
    UserPW: Yup.string().min(8).required("Please enter your password"),
    UserContactNo: Yup.string().min(9).required("Please enter your contact number"),
    UserCPW: Yup.string()
    .required()
    .oneOf([Yup.ref("UserPW"), null], "Password must match"),
});