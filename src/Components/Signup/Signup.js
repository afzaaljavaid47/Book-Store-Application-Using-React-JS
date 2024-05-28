import React, { useState } from 'react'
import { useFormik } from "formik";
import {Schema} from './Schema';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
function Signup() {
  const [res,setRes]=useState([]);
    const initialValues = {
      UserName: "",
      UserPW: "",
      UserFName: "",
      UserLName: "",
      UserEmail:"",
      UserContactNo:"",
      UserCPW:""
    };
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: Schema,
      onSubmit: (values, action)=> {
        console.log('Base URL : ',process.env.REACT_APP_API_BASE_URL);
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        };
        fetch(`${process.env.REACT_APP_API_BASE_URL}users/signup`, options)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setRes(data);
            if(data.success){
              action.resetForm();
            }
          })
          .catch(error => console.error(error));
      },
    })
    return (
      <section className="vh-100" style={{backgroundColor: '#eee'}}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{borderRadius: '25px'}}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mx-1 mx-md-4 mt-2">Sign up</p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
      
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input 
                            type="text" 
                            name="UserFName"
                            id="UserFName"
                            value={values.UserFName}
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            className="form-control" 
                            />
                            <label className="form-label" htmlFor="UserFName">Your First Name</label>
                            {errors.UserFName && touched.UserFName ? (
                              <p className="text-danger">{errors.UserFName}</p>
                            ) : null}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input 
                            type="text" 
                            name="UserLName"
                            id="UserLName"
                            value={values.UserLName}
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            className="form-control" 
                            />
                            <label className="form-label" htmlFor="UserLName">Your Last Name</label>
                            {errors.UserLName && touched.UserLName ? (
                              <p className="text-danger">{errors.UserLName}</p>
                            ) : null}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input 
                            type="text" 
                            name="UserName"
                            id="UserName"
                            value={values.UserName}
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            className="form-control" 
                            />
                            <label className="form-label" htmlFor="UserName">Your UserName</label>
                            {errors.UserName && touched.UserName ? (
                              <p className="text-danger">{errors.UserName}</p>
                            ) : null}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                           <input 
                            type="email" 
                            name="UserEmail"
                            id="UserEmail"
                            value={values.UserEmail}
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            className="form-control" 
                            />
                            <label className="form-label" htmlFor="UserEmail">Your Email</label>
                            {errors.UserEmail && touched.UserEmail ? (
                              <p className="text-danger">{errors.UserEmail}</p>
                            ) : null}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input 
                            type="phone" 
                            name="UserContactNo"
                            id="UserContactNo"
                            value={values.UserContactNo}
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            className="form-control" 
                            />
                            <label className="form-label" htmlFor="UserContactNo">Your Contact Number</label>
                            {errors.UserContactNo && touched.UserContactNo ? (
                              <p className="text-danger">{errors.UserContactNo}</p>
                            ) : null}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input 
                            type="password" 
                            name="UserPW"
                            id="UserPW"
                            value={values.UserPW}
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            className="form-control" 
                            />
                            <label className="form-label" htmlFor="UserPW">Password</label>
                            {errors.UserPW && touched.UserPW ? (
                              <p className="text-danger">{errors.UserPW}</p>
                            ) : null}
                          </div>
                        </div>
      
                        <div className="d-flex flex-row align-items-center">
                        <i className="fas fas-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input 
                            type="password" 
                            name="UserCPW"
                            id="UserCPW"
                            value={values.UserCPW}
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            className="form-control" 
                            />
                            <label className="form-label" htmlFor="UserCPW">Repeat your password</label>
                            {errors.UserCPW && touched.UserCPW ? (
                              <p className="text-danger">{errors.UserCPW}</p>
                            ) : null}
                          </div>
                        </div>          
                        <div className="d-flex justify-content-center">
                          <button className="btn btn-dark btn-lg" type="submit">Register</button>
                        </div>
                        <GoogleOAuthProvider clientId="320925187118-6s9dp26uvcftpud2qdhhjpio86eatvct.apps.googleusercontent.com">
                          <GoogleLogin
                            onSuccess={credentialResponse => {
                              credentialResponse=jwtDecode(credentialResponse.credential)
                              console.log(credentialResponse);
                            }}
                            onError={() => {
                              console.log('Login Failed');
                            }}
                          />
                        </GoogleOAuthProvider>
                        <div className="d-flex justify-content-center mt-2 mb-lg-4">
                          <p>Already have an account? <Link to='/login' style={{color:'#202B32'}}>Login</Link></p>
                        </div>
                      </form>
                          {res?.success===true? <p className="text-success text-center">{res?.message}</p>:''}
                          {res?.success===false? <p className="text-danger text-center">{res?.message}</p>:''}
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
      
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt="side"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  export default Signup;