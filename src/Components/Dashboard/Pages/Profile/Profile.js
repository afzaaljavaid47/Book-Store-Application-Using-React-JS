import React, { useEffect, useState } from 'react'
import axios from 'axios';
function Profile() {
  const [res,setRes]=useState([]);
  const [UserFname,setUserFName]=useState();
  const [UserLname,setUserLName]=useState();
  const [UserEmail,setUserEmail]=useState();
  const [UserName,setUserName]=useState();
  const [UserContactNo,setUserContactNo]=useState();
  const [error,setError]=useState();
  useEffect(()=>{
   getUserProfile();
  },[])

  const getUserProfile=async ()=>{
    const userData = await axios.get(`${process.env.REACT_APP_API_BASE_URL}users/getUserProfile`,
    {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'auth-Token':localStorage.getItem("token")        
      }
    }
);
console.log(userData.data.data);
setUserFName(userData.data.data[0]?.UserFName)
setUserLName(userData.data.data[0]?.UserLName)
setUserEmail(userData.data.data[0]?.UserEmail)
setUserName(userData.data.data[0]?.UserName)
setUserContactNo(userData.data.data[0]?.UserContactNo)
  }
        const handleSubmit=(e)=> {
        e.preventDefault();
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"UserFName":UserFname,"UserLName":UserLname,"UserContactNo":UserContactNo,"UserName":UserName})
        };
        fetch(`${process.env.REACT_APP_API_BASE_URL}users/updateProfile`, options)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setRes(data);
            if(data.success){
         
            }
          })
          .catch(error => 
            {
              console.log(error);
              setError(error);
            });
      };
    return (
      <section>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-xl-11">
              <div className="card"  style={{backgroundColor:'#2F4049'}}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-10 col-xl-10 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mx-1 mx-md-4 mt-2" style={{color:'white'}}>My Profile {JSON.stringify(error)}</p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
      
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input 
                            type="text" 
                            name="UserFName"
                            id="UserFName"
                            className="form-control" 
                            value={UserFname}
                            onChange={(e)=>setUserFName(e.target.value)}
                            />
                            <label style={{color:'white'}} className="form-label" htmlhtmlFor="UserFName">Your First Name</label>
                           
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input 
                            type="text" 
                            name="UserLName"
                            id="UserLName"
                            className="form-control" 
                            value={UserLname}
                            onChange={(e)=>setUserLName(e.target.value)}
                            />
                            <label style={{color:'white'}} className="form-label" htmlhtmlFor="UserLName">Your Last Name</label>
                            
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input 
                            type="text" 
                            name="UserName"
                            id="UserName"
                            className="form-control" 
                            value={UserName}
                            onChange={(e)=>setUserName(e.target.value)}
                            readOnly
                            />
                            <label style={{color:'white'}} className="form-label" htmlhtmlFor="UserName">Your UserName</label>
                            
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                           <input 
                            type="email" 
                            name="UserEmail"
                            id="UserEmail"
                            className="form-control" 
                            readOnly
                            value={UserEmail}
                            onChange={(e)=>setUserEmail(e.target.value)}
                            />
                            <label style={{color:'white'}} className="form-label" htmlhtmlFor="UserEmail">Your Email</label>
                            
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input 
                            type="phone" 
                            name="UserContactNo"
                            id="UserContactNo"
                            className="form-control" 
                            value={UserContactNo}
                            onChange={(e)=>setUserContactNo(e.target.value)}
                            />
                            <label style={{color:'white'}} className="form-label" htmlhtmlFor="UserContactNo">Your Contact Number</label>
                            
                          </div>
                        </div>            
                        <div className="d-flex justify-content-center">
                          <button className="btn btn-dark btn-lg" type="submit">Update</button>
                        </div>
                      </form>
                          {res?.success===true? <p className="text-success text-center mt-3">{res?.message}</p>:''}
                          {res?.success===false? <p className="text-danger text-center mt-3">{res?.message}</p>:''}
                          {error?<p className="text-danger">{JSON.stringify(error)}</p>:''}
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

  export default Profile;