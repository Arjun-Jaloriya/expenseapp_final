import * as yup from "yup";


export const ProductValidation = yup.object({
    name:yup.string().min(2).max(25).required("please enter name"),
    description:yup.string(),
    price:yup.number().required("please enter price"),
    quantity:yup.number().required("please enter phone"),
    date:yup.date().required("please enter date"),
    
})