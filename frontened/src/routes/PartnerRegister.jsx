import React from 'react'
import '../styles/auth.css'

const PartnerRegister = () => {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-visual" aria-hidden>
          <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="400" rx="12" fill="url(#g)" />
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0" stop-color="rgba(96,165,250,0.12)" />
                <stop offset="1" stop-color="transparent" />
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

          <form className="auth-form" onSubmit={(e)=>e.preventDefault()}>
            <div className="form-row">
              <label>Business name</label>
              <input type="text" placeholder="Restaurant or brand name" />
            </div>
            <div className="form-row">
              <label>Contact email</label>
              <input type="email" placeholder="business@example.com" />
            </div>
            <div className="form-row">
              <label>Password</label>
              <input type="password" placeholder="Create a password" />
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
