import * as Yup from "yup";

export const Schema = Yup.object({
    BookISBN: Yup.string().required("Please enter your Book ISBN"),
    BookTitle: Yup.string().required("Please enter your Book Title"),
    BookAuthor: Yup.string().required("Please enter your Book Author"),
    BookGenre: Yup.string().required("Please enter your Book Genre"),
    BookSummary:Yup.string().required("Please enter your Book Summary")
});