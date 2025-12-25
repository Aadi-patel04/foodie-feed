import React from 'react'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('http://localhost:3000/api/auth/user/login', {
        email,
        password
      }, {
        withCredentials: true
      });

      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
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
          <div style={{marginTop:18,fontSize:14,color:'var(--muted)'}}>Welcome back — pick up where you left off.</div>
        </div>

        <div className="auth-content">
          <div className="auth-header">
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div className="logo-pill">FF</div>
              <div>
                <h3 className="title">Welcome back</h3>
                <div className="subtitle">Sign in to your foodie account</div>
              </div>
            </div>

            <div className="role-switch">
              <a href="/user/login" className="active">User</a>
              <a href="/food-partner/login">Partner</a>
            </div>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>Email</label>
              <input type="email" name='email' placeholder="you@example.com" />
            </div>
            <div className="form-row">
              <label>Password</label>
              <input type="password" name='password' placeholder="Your password" />
            </div>

            <div className="actions">
              <a className="link" href="/user/register">Create account</a>
              <button className="btn" type="submit">Sign in</button>
            </div>

            <div className="divider" />
            <div className="small-note">Forgot password? Contact support.</div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
