import * as yup from "yup";


export const RegisterSchema = yup.object({
  name: yup.string().min(2).max(25).required("please enter name"),
  email: yup.string().email("enter valid email").required("please enter email"),
  password: yup
    .string()
    .min(6, "password is min 6 character")
    .required("please enter password"),
  phone: yup.number().min(10).required("please enter phone"),
  address: yup.string().min(5).max(100).required("please enter address"),
  image: yup.mixed()
    .required('Image is required')
    .test(
      'fileSize',
      'File size too large',
      (value) => !value || (value && value.size <= 5000000) // 5 MB limit
    )
    .test(
      'fileType',
      'Invalid file type',
      (value) =>
        !value ||
        (value && ['image/jpeg', 'image/png','image/jpg'].includes(value.type))
    ),
});

export const LoginSchema = yup.object({
  email: yup.string().email("enter valid email").required("please enter email"),
  password: yup
    .string()
    .min(6, "password is min 6 character")
    .required("please enter password"),
});
