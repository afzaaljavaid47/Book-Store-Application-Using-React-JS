import React,{useState} from 'react'
import { useFormik } from "formik";
import {Schema} from './Schema';
import { Link,useNavigate } from 'react-router-dom';
import { GoogleLogin,GoogleOAuthProvider,googleLogout } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import {LoginSocialFacebook} from 'reactjs-social-login';
import {  FacebookLoginButton} from 'react-social-login-buttons';

import { jwtDecode } from "jwt-decode";
function Login() {
    const [res,setRes]=useState([]);
    const initialValues = {
      UserEmail:"",
      UserPW:""
    };
    const navigate = useNavigate();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: Schema,
      onSubmit: (values, action)=> {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        };
        fetch(`${process.env.REACT_APP_API_BASE_URL}users/login`, options)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setRes(data);
            if(data.status){
              localStorage.setItem("token",data.userToken);
              navigate('/user_dashboard');
            }
            else
            {

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
                      <p className="text-center h1 fw-bold mx-1 mx-md-4 mt-2">Log in</p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>       
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
                        <div className="d-flex justify-content-center">
                          <button className="btn btn-dark btn-lg" type="submit">Login</button>
                        </div>
                        <GoogleOAuthProvider clientId="320925187118-6s9dp26uvcftpud2qdhhjpio86eatvct.apps.googleusercontent.com">
                          <GoogleLogin
                          text='continue_with'
                            onSuccess={credentialResponse => {
                              credentialResponse=jwtDecode(credentialResponse.credential)
                              console.log(credentialResponse);
                            }}
                            onError={() => {
                              console.log('Login Failed');
                            }}
                          />
                        </GoogleOAuthProvider>
                        <LoginSocialFacebook
                            appId='279290348101061'
                            fieldsProfile={
                              'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
                            }
                            onLoginStart={(res)=>{
                              console.log(res)
                            }}
                            onLogoutSuccess={(res)=>{
                              console.log(res)
                            }}
                            onResolve={(res)=>{
                              console.log(res)
                            }}
                            onReject={(res)=>{
                              console.log(res)
                            }}
                          >
                            <FacebookLoginButton />
                          </LoginSocialFacebook>
                          <FacebookLogin
                            appId="279290348101061"
                            onSuccess={(response) => {
                              console.log('Login Success!', response);
                            }}
                            onFail={(error) => {
                              console.log('Login Failed!', error);
                            }}
                            onProfileSuccess={(response) => {
                              console.log('Get Profile Success!', response);
                            }}
                          />
                        <div className="d-flex justify-content-center mt-2 mx-4">
                          <p>Not have an account? <Link to='/'  style={{color:'#202B32'}}>Sign Up</Link></p>
                        </div>
                      </form>
                        
                      {res?.status===false? <p className="text-danger text-center">{res?.message}</p>:''}
                 
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

  export default Login;