import React, { useState } from 'react'
// import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";
import {BeatLoader} from 'react-spinners';
import Loading from 'react-fullscreen-loading';

function Contact()
{
  const [captcha,SetCaptcha]=useState(null);
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [message,setMessage]=useState('');
  const [res,setRes]=useState(null);
  const [loading,setLoading]=useState(false);

  function onChange(value) {
    console.log("Captcha value:", value);
    SetCaptcha(value);
  }
  
    // const form = useRef();
    const sendEmail = (e) => {
      setLoading(true);
      e.preventDefault();
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,email,message})
      };
      fetch(`${process.env.REACT_APP_API_BASE_URL}email/send_email`, options)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setRes(data.status);
          setName('');
          setEmail('');
          setMessage('');
          setLoading(false);
        })
        .catch(error => 
        {
          console.log(error);
          setRes(false);
          setLoading(false);
        });
    };
      // emailjs.sendForm('service_xpl9hdc', 'template_oodwybd', form.current, 'nnO9s3F5U_hT1N92I')
      //   .then((result) => {
      //       console.log(result);
      //   }, (error) => {
      //       console.log(error);
      //   });
    // };
    return (
<div style={{color:'white'}}>
 <h2 style={{color:'white'}} className="mb-4">Contact Us</h2>
<form onSubmit={sendEmail}> 
  <div className="form-group">
    <label htmlFor="name">Name</label>
    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required className="form-control" name="from_name" id="name" placeholder="Enter Name"/>
  </div>
  <div className="form-group">
    <label htmlFor="email">Email</label>
    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="form-control" name="from_email" id="email" placeholder="Enter Email"/>
  </div>
  <div className="form-group">
    <label htmlFor="message">Message</label>
    <textarea value={message} onChange={(e)=>setMessage(e.target.value)} className="form-control" required rows={5} name="message" id="message" placeholder="Enter Message"/>
  </div>
  <ReCAPTCHA
    sitekey="6LcMkzUpAAAAAOEG60hXCIdWvax7F52SVQ-bRAub"
    onChange={onChange} name="g-recaptcha-response" value={captcha}
  />
  <button disabled={captcha!=null?false:true} type="submit" className="btn btn-dark">Send</button>
  <p className='text-success text-center'>{res==true?'Thanks for your message. We will get back to you ASAP':""}</p>
  <p className='text-danger text-center'>{res==false?'500 Internal Server Error. Please try again':""}</p>
</form>
{/* {loading?<BeatLoader color="#36d7b7" />:null} */}
<Loading loading={loading} loaderColor="white" />
    </div>      
    )
}

export default Contact;