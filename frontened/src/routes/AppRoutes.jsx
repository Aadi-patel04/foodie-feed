import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRegister from './UserRegister'
import UserLogin from './UserLogin'
import PartnerRegister from './PartnerRegister'
import PartnerLogin from './PartnerLogin'
import Home from '../../pages/general/Home'
import CreateFood from '../../pages/food-partner/CreateFood'

const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/food-partner/register" element={<PartnerRegister />} />
          <Route path="/food-partner/login" element={<PartnerLogin />} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/" element={<Home/>} />
          <Route path="/create-food" element ={<CreateFood/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default AppRoutes
