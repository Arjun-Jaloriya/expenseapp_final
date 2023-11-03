import * as yup from "yup";

export const CategoryValidation = yup.object({
    category:yup.string().required("please enter Category"),
})