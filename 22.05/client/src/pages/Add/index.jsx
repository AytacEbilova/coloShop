import React from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { useFormik } from "formik";
import {  Space, Table } from 'antd';
import {
  useDeleteProductMutation,
  useGetProductQuery,
  usePostProductMutation,
} from "../../service/productApi";
import productSchema from "../../validation/productValidation";
import Swal from "sweetalert2"
import { useParams } from 'react-router-dom';
const Add = () => {
  const { data:products, refetch } = useGetProductQuery();
  const [postProduct] = usePostProductMutation();
  const{id}=useParams();
const[deleteProduct]=useDeleteProductMutation(id);

  
  const columns = [
    {
      title: 'Image',
      render:(text,record)=>{
       return <img src={record.img} alt={text} width={100} height={50} />
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      
      
    },
    {
      title: 'Price',
      dataIndex: 'price',

    },
    {
      title: 'Discount',
      dataIndex: 'discount',

    },
    {
      title: 'New',
      render:(text,record)=>{
      return <span >{record.isNewProduct ? 'true' :'false'}</span>
      }
    },
    {
      title: 'Action',
     render:(_,record)=>{
      return <Button onClick={()=>{
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then(async(result) => {
          if (result.isConfirmed) {
            await deleteProduct(record._id);
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        });
      }} >
          Delete
      </Button>
     }

    },
  ];
  const formik = useFormik({
    initialValues: {
      img: "",
      title: "",
      price: "",
      isNewProduct: "",
      discount: "",
    },
    onSubmit: (values, { resetForm }) => {
      postProduct(values).then(() => {
        Swal.fire({
          title: "Added Succesfully!",
          text: "You clicked the button!",
          icon: "success",
        });
        resetForm();
        refetch();
      });
    },
    validationSchema:productSchema
  });

  return (
    <div style={{ width: "40%", margin: "30px auto", padding: "200px 0" }}>
      <h3>Add Product</h3>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id="outlined-basic"
          name="img"
          label="Image"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.img}
        />
        {formik.touched.img && formik.errors.img && (<span style={{color:'red'}}>{formik.errors.img}</span> )}
        <TextField
          id="outlined-basic"
          name="title"
          label="Title"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
         {formik.touched.title && formik.errors.title && (<span style={{color:'red'}}>{formik.errors.title}</span> )}
        <TextField
          id="outlined-basic"
          label="Price"
          name="price"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.price}
        />
         {formik.touched.price && formik.errors.price && (<span style={{color:'red'}}>{formik.errors.price}</span> )}
        <TextField
          id="outlined-basic"
          label="Discount"
          name="discount"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.discount}
        />
         {formik.touched.discount && formik.errors.discount && (<span style={{color:'red'}}>{formik.errors.discount}</span> )}
       <TextField
          id="outlined-basic"
          label="isNewProduct"
          name="isNewProduct"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.isNewProduct}
        />
          {formik.touched.isNewProduct && formik.errors.isNewProduct && (<span style={{color:'red'}}>{formik.errors.isNewProduct}</span> )}
       <Button variant="contained" type="submit">Add</Button>
      </form>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
       
      </Space>
      <Table columns={columns} dataSource={products?.data} />
    </div>
  );
};


export default Add;
