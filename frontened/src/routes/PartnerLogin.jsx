import React from 'react'
import '../styles/auth.css'

const PartnerLogin = () => {
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
          <div style={{marginTop:18,fontSize:14,color:'var(--muted)'}}>Sign in to manage orders and listings.</div>
        </div>

        <div className="auth-content">
          <div className="auth-header">
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div className="logo-pill">FP</div>
              <div>
                <h3 className="title">Partner sign in</h3>
                <div className="subtitle">Access your restaurant dashboard</div>
              </div>
            </div>

            <div className="role-switch">
              <a href="/user/login">User</a>
              <a href="/food-partner/login" className="active">Partner</a>
            </div>
          </div>

          <form className="auth-form" onSubmit={(e)=>e.preventDefault()}>
            <div className="form-row">
              <label>Email</label>
              <input type="email" placeholder="business@example.com" />
            </div>
            <div className="form-row">
              <label>Password</label>
              <input type="password" placeholder="Your password" />
            </div>

            <div className="actions">
              <a className="link" href="/food-partner/register">Create partner account</a>
              <button className="btn" type="submit">Sign in</button>
            </div>

            <div className="divider" />
            <div className="small-note">Need help? Reach partner support.</div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PartnerLogin
