import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Home from './Pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Refer from './Pages/Refer/Refer'
import Servicess from './Components/Servicess/Servicess'
import About from './Pages/About/About'

import Footer from './Components/Footer/Footer'
import Heading from './Components/Heading/Heading'
import Header from './Components/Header/Header'
import Appointment from './Pages/Appointment/Appointment'
import Blog from './Pages/Blog/Blog'
import Cart from './Pages/Cart/Cart'
import Society from './Pages/Prices/Society'
import Solar from './Pages/Prices/Solar'
import Gst from './Pages/Prices/Gst'
import Itr from './Pages/Prices/Itr'
import Nsic from './Pages/Prices/Nsic'
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login'
import Dashboard from './Pages/Dashboard/Dashboard'
import Admin from './Pages/Admin/Admin'
import ContentViewer from './Pages/ContentViewer/ContentViewer'
import AdminContentEditor from './Pages/AdminContentEditor/AdminContentEditor'
import Single from './Pages/Single/Single'
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard'
import AddBlog from './Pages/AddBlog'
import { useAuth } from './Context/AuthContext.jsx'
import Users from './Pages/AdminDashboard/Users.jsx'
import UsersSearch from './Pages/AdminDashboard/UsersSearch.jsx'
import AdminBlogs from './Pages/AdminDashboard/AdminBlogs.jsx'
import CheckoutPage from './Pages/Checkout/Checkout.jsx'
import OrdersPage from './Pages/Dashboard/UserOrder.jsx'
import ThankYou from './Pages/ThankYou';


import { useLocation } from 'react-router-dom';
import Orders from './Pages/AdminDashboard/Orders.jsx';
import Payement from './Pages/AdminDashboard/Payement.jsx';




function App() {

 
  const { user } = useAuth()

  // If user is still null and there's a chance they're loading from localStorage
  if (user === null && localStorage.getItem('user')) {
    return <div>Loading...</div> // Prevent rendering until hydration completes
  }
  
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/Admin');


  return (
    <>
    {!isAdminPage && <Heading />}
    {!isAdminPage && <Header />}
    
    <Routes>
      <Route path ="/" element={<Home/>}/>
      <Route path ="/Refer" element={<Refer/>}/>
      <Route path ="/Servicess" element={<Servicess/>}/>
      <Route path ="/About" element={<About/>}/>
     
      <Route path="/Appointment" element={<Appointment />} ></Route>
      <Route path='/Blog' element={<Blog/>}/>
      <Route path ='/Cart' element={<Cart/>}/>
      <Route path='/Society' element={<Society/>}/>
      <Route path='/Solar' element={<Solar/>}/>
      <Route path='/Itr' element={<Itr/>}/>
      <Route path='/Gst' element={<Gst/>}/>
      <Route path='/Nsic' element={<Nsic/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path ='/Login' element={<Login/>}/>
      <Route path='/Dashboard' element={<Dashboard/>}/>
      <Route path="/Admin" element={<Admin/>} />
      <Route path="/content/:level/:slug" element={<ContentViewer />} />
      <Route path="/admin/:level/:slug" element={<AdminContentEditor/>} />
     <Route path="/blogs/:blog_id" element={<Single/>} />
      <Route path="/blogs/all" element={<Blog/>} />
      <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
      <Route path="/blogs/new" element={<AddBlog/>} />
      <Route path="/Users" element={<Users/>}/>
       <Route path="/UsersSearch" element={<UsersSearch/>}/>
        <Route path="/Admin" element={<Admin/>}/>
         <Route path="/AdminBlogs" element={<AdminBlogs/>}/>
          <Route path="/Users" element={<Users/>}/>
           <Route path="/Users" element={<Users/>}/>
           <Route path="/checkout/:cartItemId" element={<CheckoutPage />} />
           <Route path="/Orders" element={<Orders/>}/>
           <Route path="/Payement" element={<Payement/>}/>
           <Route path="/OrdersPage" element={<OrdersPage/>} />
           <Route path="/thank-you" element={<ThankYou />} />



    </Routes>
    <Footer/>

    <ToastContainer position="top-right" autoClose={3000} />
   
    </>
  )
}

export default App
