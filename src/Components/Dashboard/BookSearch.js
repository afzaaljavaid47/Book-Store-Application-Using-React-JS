import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
function BookSearch({props}) {
  const [data1,setData]=useState([]);
  const {search}=useParams();
  const [refresh,setRefresh]=useState(false);
        const addToLikeList = async (bookISBN) => {
            try {
              const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}book/addToLikeList`,{ BookISBN: bookISBN },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'auth-Token': localStorage.getItem('token'),
                  },
                }
              );
              console.log(response.data);
              setData([]);
              getData();
               setRefresh(!refresh);
            } catch (error) {
              console.error('Error:', error);
            }
          };
          const deleteBook = async (bookISBN) => {
            try {
              if(window.confirm("Are you sure you want to delete the book?")){
              const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}book/deleteBook`,{ BookISBN: bookISBN },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'auth-Token': localStorage.getItem('token'),
                  },
                }
              );
              console.log(response.data);
              setData([]);
              setRefresh(!refresh);
            }
          }
             catch (error) {
              console.error('Error:', error);
            }}
        
          const addToHideList = async (bookISBN) => {
            try {
              const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}book/addToHideList`,{ BookISBN: bookISBN },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'auth-Token': localStorage.getItem('token'),
                  },
                }
              );
              setData([]);
              getData();
              setRefresh(!refresh);
              console.log(response.data);
            } catch (error) {
              console.error('Error:', error);
            }
          };
                
        
        const getData=async ()=>{
            setData([]);
            const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'auth-Token':localStorage.getItem("token")
                }
              };
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}book/searchBook`,{search}, options)
            .then(response => {
                console.log(response.data);
                setData(response.data);
                props.setSearchtxt();
            })
            .catch(error => console.error(error));
        }
        useEffect(()=>{
            getData();
        },[refresh])

       return (
        <>
        <h2 className="mb-4" style={{color:'white'}}>-- Search Books -- {search}</h2>
          <div className="row d-flex">
                  <div className="row">
                   {data1?.length>0?data1.map((data,index)=>(
                        <div key={index} className='col-md-3 mb-4' style={{marginRight:data1.length==2?'90px':data1.length==3?'35px':'0px',backgroundColor:'#2F4049'}}>
                            <div className="card me-3" style={{width:'320px',backgroundColor:'#445A65',color:'white'}}>
                                <div className="card-body">
                                    <h5 className="card-title" style={{color:'white'}}>{data.BookTitle.substring(0, 25)}</h5>
                                    <p className="card-text">Book ISBN - {data.BookISBN}</p>
                                    <p className="card-text">Published By - {data.BookAuthor}</p>
                                    <p className="card-text">Book Gerne - {data.BookGenre}</p>
                                    <p className="card-text">Book Summary - {data.BookSummary.substring(0,90)}{data.BookSummary.length>90?'...':''}</p>
                                    <Link to={`/user_dashboard/book_detail/${data.BookISBN}`} className="btn btn-dark mr-1"><i className="fa-brands fa-readme"></i></Link>
                                    <Link to={`/user_dashboard/edit_book/${data.BookISBN}`} className="btn btn-warning mr-1"><i className='fa fa-edit'></i></Link>
                                    <button title={(data.likeList?.length>0? 'Liked' : 'Press to like')} onClick={()=>addToLikeList(data.BookISBN)} className="btn btn-success mr-1"><i className={(data.likeList?.length>0? 'fa' : 'fa-regular') + " fa-heart"}></i></button>
                                    <button title={(data.hideList?.length>0? 'Hidden' : 'Press to Hide')} onClick={()=>addToHideList(data.BookISBN)} className="btn btn-info mr-1"><i className={"fa-regular "+(data.hideList?.length>0 ? 'fa-eye-slash' : 'fa-eye')}></i></button>
                                    <button title='Press to Delete' onClick={()=>deleteBook(data.BookISBN)} className="btn btn-danger mr-1"><i className="fa fa-trash"></i></button>
                                    {data?.BookLink?.endsWith('.pdf')?<a target='_blank' href={data.BookLink} className='btn btn-success'><i className="fa-solid fa-file-pdf"></i></a>:data.BookLink!=""?<a target='_blank' href={data.BookLink} className='btn btn-success'><i className="fa-solid fa-globe"></i></a>:''}
                                </div>
                            </div>
                        </div>
                   ))          
                    :<p>No any books data exists in db</p>}
                   </div>
                  </div>
                  </>
    )
}
export default BookSearch;