import React from 'react'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const UserRegister = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here

    const firstName = e.target.firstName.value;
    // console.log(firstName);
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

//     console.log({
//   firstName,
//   lastName,
//   email,
//   password
// });


    const response = await axios.post('http://localhost:3000/api/auth/user/register', {
      fullName: firstName + ' ' + lastName,
      email,
      password
    },
  {
    withCredentials: true
  })

    console.log(response.data)

    navigate("/")
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
          <div style={{ marginTop: 18, fontSize: 14, color: 'var(--muted)' }}>Discover trending meals and share your favorites.</div>
        </div>

        <div className="auth-content">
          <div className="auth-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="logo-pill">FF</div>
              <div>
                <h3 className="title">Create account</h3>
                <div className="subtitle">Register as a food lover to discover and share meals</div>
              </div>
            </div>

            <div className="role-switch">
              <a href="/user/register" className="active">User</a>
              <a href="/food-partner/register">Partner</a>
            </div>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>Name</label>
              <div className="name-row">
                <input type="text" name="firstName" placeholder="First name" />
                <input type="text" name="lastName" placeholder="Last name" />
              </div>
            </div>
            <div className="form-row">
              <label>Email</label>
              <input type="email" name="email" placeholder="you@example.com" />
            </div>
            <div className="form-row">
              <label>Password</label>
              <input type="password" name="password" placeholder="Create a strong password" />
            </div>


            <div className="form-row">
              <button className="btn" type="submit">Create account</button>
            </div>

            <div className="divider" />
            <div className="small-note">Already have an account? <a className="link" href="/user/login">Sign in</a></div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserRegister
