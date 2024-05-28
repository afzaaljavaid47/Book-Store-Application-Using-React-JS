import React, { Component } from 'react'

export default class Main extends Component {
  render() {
    return (
<div style={{color:'white'}}>
<h2 style={{color:'white'}} className="mb-4">Book Store Web Application</h2>
<p>Welcome to the book store web application app</p>
<h4 style={{color:'white'}}>Features</h4>
<ul>
  <li>Add Book</li>
  <li>Update Book</li>
  <li>Like Book</li>
  <li>Hide Book</li>
  <li>UnLike Book</li>
  <li>Unhide book</li>
  <li>Update Profile</li>
</ul>
</div>      
    )
  }
}
