import React from 'react'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'  

const PartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here

    const businessName = e.target.businessName.value;
    const contactPerson = e.target.contactPerson.value;
    const phoneNumber = e.target.phoneNumber.value;
    const address = e.target.address.value;
    const email = e.target.email.value;
    const password = e.target.password.value;   

    const response = await axios.post('http://localhost:3000/api/auth/food-partner/register', {
      name:businessName,
      contactName:contactPerson,
      phone:phoneNumber,
      address,
      email,
      password
    },
  {
    withCredentials: true
  })

    console.log(response.data)

    navigate("/create-food")
  };
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-visual" aria-hidden>
          <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="400" rx="12" fill="url(#g)" />
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0" stopColor="rgba(96,165,250,0.12)" />
                <stop offset="1" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
          <div style={{marginTop:18,fontSize:14,color:'var(--muted)'}}>Manage your menu, orders, and presence on FoodieFeed.</div>
        </div>

        <div className="auth-content">
          <div className="auth-header">
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div className="logo-pill">FP</div>
              <div>
                <h3 className="title">Partner sign up</h3>
                <div className="subtitle">Register your restaurant or kitchen</div>
              </div>
            </div>

            <div className="role-switch">
              <a href="/user/register">User</a>
              <a href="/food-partner/register" className="active">Partner</a>
            </div>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>Business name</label>
              <input type="text"name='businessName' placeholder="Restaurant or brand name" />
            </div>
            <div className="form-row">
              <label>Contact</label>
              <div className="contact-row">
                <input type="text" name="contactPerson" placeholder="Contact person name" />
                <input type="tel" className="phone-input" name="phoneNumber" placeholder="Phone number" />
              </div>
            </div>
            <div className="form-row">
              <label>Address</label>
              <input type="text" name='address' placeholder="Business address" />
            </div>
            <div className="form-row">
              <label>Contact email</label>
              <input type="email" name='email' placeholder="business@example.com" />
            </div>
            <div className="form-row">
              <label>Password</label>
              <input type="password" name='password' placeholder="Create a password" />
            </div>

            <div className="form-row">
              <button className="btn" type="submit">Create partner account</button>
            </div>

            <div className="divider" />
            <div className="small-note">Already a partner? <a className="link" href="/food-partner/login">Sign in</a></div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PartnerRegister
