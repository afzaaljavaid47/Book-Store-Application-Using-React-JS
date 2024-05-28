import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams} from 'react-router-dom';

function EditBook() {
  const [data,setData]=useState([]);
  const [res,setRes]=useState([]);
  const [ISBN,setISBN]=useState();
  const [author,setAuthor]=useState();
  const [title,setTitle,]=useState();
  const [gerne,setGerne]=useState();
  const [summary,setSummary]=useState();
  const [url,setURL]=useState();
  const {id}=useParams();
  const [refresh,setRefresh]=useState(false);        
        const getData=async ()=>{
          const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}book/getBookById`,{ id:id },
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-Token':localStorage.getItem("token")
            }
          }
        );
        console.log("All Data : ",response.data);
        console.log("Filter Data : ",response.data.filter(data => data.BookISBN==id));
        await setData(response.data.filter(data => data.BookISBN==id));
        const data1=response.data.filter(data => data.BookISBN==id);
        setGerne(data1[0]?.BookGenre);
        setTitle(data1[0]?.BookTitle);
        setAuthor(data1[0]?.BookAuthor);
        setISBN(data1[0]?.BookISBN);
        setURL(data1[0]?.BookLink);
        setSummary(data1[0]?.BookSummary);
        }
        useEffect(()=>{
            getData();
        },[refresh])
        const handleSubmit=(e)=> {
            e.preventDefault();
            const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({"ISBN":ISBN,"Title":title,"Author":author,"Gerne":gerne,"Summary":summary,"Link":url})
            };
            fetch(`${process.env.REACT_APP_API_BASE_URL}book/updateBook`, options)
              .then(response => response.json())
              .then(data => {
                console.log(data);
                setRes(data);
              })
              .catch(error => 
                {
                  console.log(error);
                  setRes(error);
                });
          };
       return (
        <>
                   {data?.length>0&&(
                    <>
                  <form onSubmit={handleSubmit} className="w-50">
      
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input 
                            type="text" 
                            name="ISBN"
                            id="BookISBN"
                            className="form-control" 
                            value={ISBN}
                            readOnly
                            />
                            <label className="form-label" style={{color:'white'}} htmlhtmlFor="BookISBN">Book ISBN</label>
                            
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input 
                            type="text" 
                            name="Title"
                            id="BookTitle"
                            className="form-control" 
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                            />
                            <label className="form-label" style={{color:'white'}} htmlhtmlFor="BookTitle">Book Title</label>
                            
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input 
                            type="text" 
                            name="Author"
                            id="BookAuthor"
                            className="form-control" 
                            value={author}
                            onChange={(e)=>setAuthor(e.target.value)}
                            />
                            <label className="form-label" style={{color:'white'}} htmlhtmlFor="BookAuthor">Book Author</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                           <input 
                            type="text" 
                            name="Gerne"
                            id="BookGenre"
                            className="form-control" 
                            value={gerne}
                            onChange={(e)=>setGerne(e.target.value)}
                            />
                            <label className="form-label" style={{color:'white'}} htmlhtmlFor="BookGenre">Book Genre</label>
                            
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                           <textarea  
                            name="summary"
                            id="summary"
                            className="form-control" 
                            value={summary}
                            rows={5}
                            onChange={(e)=>setSummary(e.target.value)}
                            />
                            <label className="form-label" style={{color:'white'}} htmlhtmlFor="Summary">Book Summary</label>
                            
                          </div>
                        </div>   
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fas-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                           <input 
                            type="url" 
                            name="url"
                            id="url"
                            className="form-control" 
                            value={url}
                            onChange={(e)=>setURL(e.target.value)}
                            />
                            <label className="form-label" style={{color:'white'}} htmlhtmlFor="url">Book URL</label>
                            
                          </div>
                        </div>      
                        <div className="d-flex justify-content-center">
                          <button className="btn btn-dark btn-lg" type="submit">Update Book</button>
                        </div>
                      </form>
                      {res?.success===true? <p className="text-success text-center mt-3">{res?.message}</p>:''}
                      {res?.success===false? <p className="text-danger text-center mt-3">{res?.message}</p>:''}                  
</>
  )}
  </>
    )
}
export default EditBook;