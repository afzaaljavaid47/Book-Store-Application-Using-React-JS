import React, { Component } from 'react'

export default class FAQ extends Component {
  render() {
    return (
<div>
 <h2 className="mb-4" style={{color:'white'}}>Frequently Asked Questions</h2>
 <div className="accordion" id="accordionExample">
  <div className="card" style={{backgroundColor:'#2F4049',color:'white'}}>
    <h5 style={{color:'white'}}>How can i add a new book?</h5>
    <p>Go to the Add Books page and add as many books as you like!</p>

      
 
        <h5 style={{color:'white'}}>What information is required to add a new book? </h5>
      
      <p>The book’s ISBN, title, author, genre, and summary is required to add a new book. And, of course, if you have a downloadable link to the book, we’d appreciate you placing it as well!  </p>
 <h5 style={{color:'white'}}> How do I unhide books? </h5>
      <p>You can go to the Hide Books page and click on the eye icon to unhide a book!</p>
   <h5 style={{color:'white'}}>Can I update my profile information?</h5>
    
      <p>For sure! Just go to the My Profile page and change the information you want to, then click Update.</p>
   </div>    
   </div>
   </div>
    )
}
}