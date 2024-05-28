import React, { useState } from 'react'
import { useFormik } from "formik";
import {Schema} from './Schema';
import axios from 'axios';
import ImageUploading from 'react-images-uploading';

function AddBookMultiple() {
  const [res,setRes]=useState([]);
  const [img,setImg]=useState(null);
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
    const initialValues = {
      BookISBN: "",
      BookTitle: "",
      BookAuthor: "",
      BookGenre: "",
      BookSummary:"",
      photo:"",
      BookLink:"",
      UserName:""
    };
    const { values, errors, touched, handleBlur, handleChange,setFieldValue, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: Schema,
      onSubmit:async (values, action)=> {
        console.log(values);
        const formData = new FormData();
        for (let value in values) {
          formData.append(value, values[value]);
        }
        images.forEach((file) => {
          formData.append('images', file.file);
        });
        console.log(formData.get('images'));
        for (var pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}book/addBookWithImage`, formData,{
          headers: {
                'Content-Type':'application/form-data',
                 'auth-Token':localStorage.getItem("token")
               }
        })
          .then(data => {
            console.log(data.data);
            setRes(data.data);
            if(data.data.success){
              setImages([]);
              action.resetForm();
            }
          })
          .catch(error => console.error(error));
      },
    })
    return (
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-xl-11">
              <div className="card" style={{backgroundColor:'#2F4049'}}>
                <div className="card-body">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5">
                      <p className="text-center h1 fw-bold" style={{color:'white'}}>Add Book</p>
                      <form onSubmit={handleSubmit} encType='multipart/form-data'>
      
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input 
                            type="text" 
                            name="BookISBN"
                            id="BookISBN"
                            value={values.BookISBN}
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            className="form-control" 
                            />
                            <label className="form-label" style={{color:'white'}} htmlFor="BookISBN">Book ISBN</label>
                            {errors.BookISBN && touched.BookISBN ? (
                              <p className="text-danger">{errors.BookISBN}</p>
                            ) : null}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input 
                            type="text" 
                            name="BookTitle"
                            id="BookTitle"
                            value={values.BookTitle}
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            className="form-control" 
                            />
                            <label className="form-label" style={{color:'white'}} htmlFor="BookTitle">Book Title</label>
                            {errors.BookTitle && touched.BookTitle ? (
                              <p className="text-danger">{errors.BookTitle}</p>
                            ) : null}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input 
                            type="text" 
                            name="BookAuthor"
                            id="BookAuthor"
                            value={values.BookAuthor}
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            className="form-control" 
                            />
                            <label className="form-label" style={{color:'white'}} htmlFor="BookAuthor">Book Author</label>
                            {errors.BookAuthor && touched.BookAuthor ? (
                              <p className="text-danger">{errors.BookAuthor}</p>
                            ) : null}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                           <input 
                            type="text" 
                            name="BookGenre"
                            id="BookGenre"
                            value={values.BookGenre}
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            className="form-control" 
                            />
                            <label className="form-label" style={{color:'white'}} htmlFor="BookGenre">Book Genre</label>
                            {errors.BookGenre && touched.BookGenre ? (
                              <p className="text-danger">{errors.BookGenre}</p>
                            ) : null}
                          </div>
                        </div>      
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                           <textarea
                            name="BookSummary"
                            id="BookSummary"
                            value={values.BookSummary}
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            className="form-control" 
                            rows={5}
                            />
                            <label className="form-label" style={{color:'white'}} htmlFor="BookSummary">Book Summary</label>
                            {errors.BookSummary && touched.BookSummary ? (
                              <p className="text-danger">{errors.BookSummary}</p>
                            ) : null}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                           <input 
                            type="url" 
                            name="BookLink"
                            id="BookLink"
                            value={values.BookLink}
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            className="form-control" 
                            />
                            <label className="form-label" style={{color:'white'}} htmlFor="BookLink">Book Link if any. </label>
                            {errors.BookLink && touched.BookLink ? (
                              <p className="text-danger">{errors.BookLink}</p>
                            ) : null}
                          </div>
                        </div>     
                        <div className="d-flex justify-content-center">
                          <input type='submit' value="Add Book" className="btn btn-dark btn-lg"/>
                        </div>
                      </form> 
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                          <ImageUploading
                            multiple
                            value={images}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                          >
                            {({
                              imageList,
                              onImageUpload,
                              onImageRemoveAll,
                              onImageUpdate,
                              onImageRemove,
                              isDragging,
                              dragProps,
                            }) => (
                              <div className="upload__image-wrapper">
                                <button
                                  style={isDragging ? { color: 'red' } : undefined}
                                  onClick={onImageUpload}
                                  {...dragProps}
                                  className='btn btn-primary'
                                >
                                  Click or Drop here
                                </button>
                                &nbsp;
                                <button className='btn btn-danger' onClick={onImageRemoveAll}>Remove all images</button>
                                {imageList.map((image, index) => (
                                  <div key={index} className="image-item">
                                    <img src={image['data_url']} alt="" width="300" />
                                    <div className="image-item__btn-wrapper">
                                      <button className='btn btn-success' onClick={(e) => {e.preventDefault();onImageUpdate(index)}}>Update</button>
                                      <button className='btn btn-danger' onClick={(e) => {e.preventDefault();onImageRemove(index)}}>Remove</button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </ImageUploading>
                         
                          </div>
                        </div>  
                        
                          {res?.success===true? <p className="mt-2 text-center text-success">{res?.message}</p>:''}
                          {res?.success===false? <p className="mt-2 text-center text-danger">{res?.message}</p>:''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
  }

  export default AddBookMultiple;