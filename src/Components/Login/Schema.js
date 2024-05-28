import * as Yup from "yup";

export const Schema = Yup.object({
    UserEmail: Yup.string().email().required("Please enter your email"),
    UserPW: Yup.string().min(8).required("Please enter your password")
});