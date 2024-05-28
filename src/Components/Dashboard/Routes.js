import {
  Link,
  Route,
  Routes,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";

import Main from "./Main";
import Books from "./Books/Books";
import AllBooks from './AllBooks/AllBooks'
import LikeBooks from './LikeBooks'
import HideBooks from "./HideBooks";
import BookDetails from "./BookDetails";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
// import Profile from "./Pages/Profile";
import FAQ from "./Pages/FAQ";
import Profile from '../Dashboard/Pages/Profile/Profile'
import { useEffect, useState } from "react";
import EditBook from "./EditBook";
import BookSearch from "./BookSearch";
import AddBook from "./Books/AddBook";
import AddBookMultiple from "./Books/AddBookMultiple";

function UserRoutes() {
  const route=useParams();
  const Navigate=useNavigate();
  const [search,setSearch]=useState('');
  useEffect(()=>{
if(!localStorage.getItem('token'))
{
  Navigate('/login');
}
  },[])
  const location = useLocation();
  const setSearchtxt=()=>{
    setSearch();
  }
 const Logout=()=>{
    localStorage.removeItem('token');
    Navigate('/login');
  }
  return (
  <div className="wrapper d-flex align-items-stretch">
  <nav id="sidebar" className="active">
    <h1><Link to="" className="logo">Book.it</Link></h1>
  <ul className="list-unstyled components mb-5">
  <li className="active">
    <Link to=""><span className="fa fa-home" style={{color:'#FFC30D'}}></span> Home</Link>
  </li>
  <li>
      <Link to="about"><span className="fa fa-address-card" style={{color:'#FFC30D'}}></span> About Us</Link>
  </li>
  <li>
    <Link to="contact"><span className="fa fa-phone" style={{color:'#FFC30D'}}></span> Contact Us</Link>
  </li>
  <li>
    <Link to="faq"><span className="fa fa-question" style={{color:'#FFC30D'}}></span> FAQ</Link>
  </li>
  <li>
    <Link to="add_book"><span className="fa fa-add" style={{color:'#FFC30D'}}></span> Add Book</Link>
  </li>
  {/* <li>
    <Link to="all_books"><span className="fa fa-book" style={{color:'#FFC30D'}}></span> All Books</Link>
  </li> */}
  <li>
    <Link to="hide_books"><span className="fa fa-eye" style={{color:'#FFC30D'}}></span> Hide Books</Link>
  </li>
  <li>
    <Link to="like_books"><span className="fa fa-heart" style={{color:'#FFC30D'}}></span> Like Books</Link>
  </li>
  <li>
    <Link to="profile"><span className="fa fa-person" style={{color:'#FFC30D'}}></span> My Profile</Link>
  </li>
</ul>
</nav>
<div id="content" className="p-4 p-md-5">
<nav className="navbar navbar-expand-lg fixed" style={{backgroundColor:'#5A7887',color:'white'}}>
  <div className="container-fluid">
    <h4><Link to="" style={{color:'white'}}>Book.it</Link></h4>
    <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fa fa-bars"></i>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item">
            <Link className="nav-link" to="" style={{color:'white'}}>Home</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="about" style={{color:'white'}}>About</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="contact" style={{color:'white'}}>Contact</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to='add_book' style={{color:'white'}}>Add Books</Link>
        </li>
        {/* <li className="nav-item">
            <Link className="nav-link" to='all_books' style={{color:'white'}}>All Books</Link>
        </li> */}
        <li className="nav-item">
            <Link className="nav-link" to='hide_books' style={{color:'white'}}>Hide Books</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to='like_books' style={{color:'white'}}>Like Books</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to='faq' style={{color:'white'}}>FAQ</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to='profile' style={{color:'white'}}>Profile</Link>
        </li>
        <li className="nav-item">
            <button className="nav-link btn" style={{color:'white'}} onClick={Logout}>Logout</button>
        </li>
        <form class="d-flex">
        <input class="form-control me-2" value={search} onChange={(e)=>setSearch(e.target.value)} name={search} type="search" placeholder="Search" aria-label="Search"/>
        <Link to={`book_search/${search}`} style={{backgroundColor:'#FFC30D'}} class="btn btn-success">Search</Link>
      </form>
      </ul>
    </div>
  </div>
</nav>
<Routes>
  <Route path="/" element={<AllBooks/>} />
  <Route path="/add_book" key="books" element={<AddBookMultiple/>} />
  {/* <Route path="/all_books" key={location.key} element={<AllBooks/>} /> */}
  <Route path="/like_books" key={location.key} element={<LikeBooks/>} />
  <Route path="/hide_books" key={location.key} element={<HideBooks/>} />
  <Route path="/book_detail/:id" key={location.key} element={<BookDetails/>} />
  <Route path="/book_search/:search" key={route.params} element={<BookSearch setSearchtxt={setSearchtxt}/>} />
  <Route path="/edit_book/:id" key={location.key} element={<EditBook/>} />
  <Route path="/about" element={<About/>} />
  <Route path="/contact" element={<Contact/>} />
  <Route path="/faq" element={<FAQ/>} />
  <Route path="/profile" element={<Profile/>} />
</Routes>
</div>
</div>
  );
}

export default UserRoutes;
