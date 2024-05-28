import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function LikeBooks() {
  const [data,setData]=useState([]);
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
              setData([]);
              getData();
              setRefresh(!refresh);
              console.log(response.data);
            } catch (error) {
              console.error('Error:', error);
            }
          };
                
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-Token':localStorage.getItem("token")
          }
        };
        const getData=()=>{
            fetch(`${process.env.REACT_APP_API_BASE_URL}book/getAllLikeBooks`, options)
            .then(response => response.json())
            .then(data => {
              console.log(data);
              setData(data);
            })
            .catch(error => console.error(error));
        }
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
            getData();
             setRefresh(!refresh);
          }
        }
           catch (error) {
            console.error('Error:', error);
          }}
      
        useEffect(()=>{
            getData();
        },[refresh])

       return (
        <>
        <h2 className="mb-4" style={{color:'white'}}>-- Like Books --</h2>
          <div className="row d-flex">
                  <div className="row">
                   {data?.filter(i=>i.bookData.length>0).length>0?data.map((data1,index)=>(
                        <div key={index} className='col-md-3' style={{display:data1.bookData[0]?.BookTitle?'block':'none',marginRight:data.filter(i=>i.bookData.length>0).length==2?'90px':data.filter(i=>i.bookData.length>0).length==3?'35px':'0px'}}>
                            <div className="card me-3" style={{width:'300px',backgroundColor:'#445A65',color:'white'}}>
                                <div className="card-body">
                                    <h5 className="card-title" style={{color:'white'}}>{data1.bookData[0]?.BookTitle.substring(0, 25)}</h5>
                                    <p className="card-text">Book ISBN - {data1.bookData[0]?.BookISBN}</p>
                                    <p className="card-text">Published By - {data1.bookData[0]?.BookAuthor}</p>
                                    <p className="card-text">Book Genre - {data1.bookData[0]?.BookGenre}</p>
                                    <p className="card-text">Book Summary - {data1.bookData[0]?.BookSummary.substring(0,90)}{data1.bookData[0]?.BookSummary.length>90?'...':''}</p>
                                   
                                    <Link to={`/user_dashboard/book_detail/${data1?.bookData[0]?.BookISBN}`} className="btn btn-dark mr-1"><i className="fa-brands fa-readme"></i></Link>
                                    <Link to={`/user_dashboard/edit_book/${data1?.bookData[0]?.BookISBN}`} className="btn btn-warning mr-1"><i className='fa fa-edit'></i></Link>
                                    <button title={(data1.bookData?.length>0? 'Liked' : 'Press to like')} onClick={()=>addToLikeList(data1.bookData[0]?.BookISBN)} className="btn btn-success mr-1"><i className={(data1.bookData?.length>0? 'fa' : 'fa-regular') + " fa-heart"}></i></button>
                                    <button title='Press to Delete' onClick={()=>deleteBook(data1.BookISBN)} className="btn btn-danger mr-1"><i className="fa fa-trash"></i></button>
                                    {data1?.bookData[0]?.BookLink?.endsWith('.pdf')?<a target='_blank' href={data1?.bookData[0]?.BookLink} className='btn btn-success'><i class="fa-solid fa-file-pdf"></i></a>:data1?.bookData[0]?.BookLink!=""?<a target='_blank' href={data1?.bookData[0]?.BookLink} className='btn btn-success'><i class="fa-solid fa-globe"></i></a>:''}
                                
                                </div>
                            </div>
                        </div>
                   ))          
                    :<p style={{color:'white'}}>No any books data exists in db</p>}
                   </div>
                  </div>
                  </>
    )
}
export default LikeBooks;