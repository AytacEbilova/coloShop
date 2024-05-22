import * as yup from "yup";

const productSchema = yup.object().shape({
  img: yup.string().min(3).required("URL is required."),
  title: yup.string().min(3).required("Title is required."),
  price:yup.string().min(3).required("Price is required."),
  isNewProduct:yup.bool().required(),
  discount:yup.number().required()
});
export default productSchema